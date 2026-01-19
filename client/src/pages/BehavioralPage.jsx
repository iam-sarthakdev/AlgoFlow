import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, User, Briefcase, Star, Github, FileText, ArrowLeft, Loader2, BookOpen } from 'lucide-react';
import contentService from '../services/contentService';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BehavioralPage = () => {
    const [loading, setLoading] = useState(false);
    const [synced, setSynced] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState('');
    const [contentLoading, setContentLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSync = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await contentService.getBehavioral();
            if (response.data && response.data.length > 0) {
                const validFiles = response.data.filter(f => f.name !== 'Add Contents.txt');
                setFiles(validFiles);
                setSynced(true);
            } else {
                setError("No content found in the repository.");
            }
        } catch (error) {
            console.error("Sync failed:", error);
            setError("Failed to sync content. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileClick = async (file) => {
        setSelectedFile(file);
        setContentLoading(true);
        try {
            const response = await contentService.getFileContent(file.path);
            setContent(response.content);
        } catch (error) {
            console.error("Failed to load content:", error);
        } finally {
            setContentLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 h-[calc(100vh-80px)] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
                        Behavioral Interviews
                    </h1>
                    <p className="text-white/60 mt-1">
                        Master the "Soft Skills" that break or make your FAANG offer.
                    </p>
                </div>
                {error && <span className="text-red-400 text-sm mb-2 mr-4">{error}</span>}
                {!synced && (
                    <button
                        onClick={handleSync}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-[#2D2D2D] hover:bg-[#3D3D3D] rounded-lg transition-colors border border-white/10 disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Github size={18} />}
                        <span>{loading ? 'Syncing...' : 'Sync Questions'}</span>
                    </button>
                )}
            </div>

            {!synced ? (
                /* Empty/Pre-sync state */
                <div className="flex-1 glass-card flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/10">
                    <MessageSquare size={64} className="text-white/20 mb-6" />
                    <h2 className="text-xl font-bold text-white mb-2">Prepare for Behavioral Questions</h2>
                    <p className="text-white/40 max-w-md mb-8">
                        FAANG interviews rely heavily on behavioral questions.
                        Sync to access a curated list of common questions and the STAR method guide.
                    </p>
                    <button
                        onClick={handleSync}
                        disabled={loading}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl transition-all shadow-lg shadow-orange-500/20 font-semibold text-white"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <Github size={20} />}
                        <span>{loading ? 'Fetching Questions...' : 'Load from GitHub'}</span>
                    </button>
                </div>
            ) : (
                /* Content View */
                <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Files List */}
                    <div className={`md:col-span-1 overflow-y-auto custom-scrollbar glass-card p-4 ${selectedFile ? 'hidden md:block' : 'block'}`}>
                        <h3 className="font-semibold text-white/80 mb-4 sticky top-0 bg-[#1a1a1c] p-2 rounded-lg z-10 flex justify-between items-center">
                            <span>Questions & Topics</span>
                            <span className="text-xs text-white/40">{files.length} items</span>
                        </h3>
                        <div className="space-y-2">
                            {files.map((file) => (
                                <button
                                    key={file.path}
                                    onClick={() => handleFileClick(file)}
                                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${selectedFile?.path === file.path
                                        ? 'bg-orange-500/10 text-orange-200 border border-orange-500/20'
                                        : 'hover:bg-white/5 text-white/70'
                                        }`}
                                >
                                    <MessageSquare size={16} className={selectedFile?.path === file.path ? 'text-orange-400' : 'text-white/40'} />
                                    <span className="truncate text-sm">{file.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Preview */}
                    <div className={`md:col-span-2 glass-card p-6 overflow-hidden flex flex-col ${!selectedFile ? 'hidden md:flex' : 'flex'}`}>
                        {selectedFile ? (
                            <>
                                <div className="flex-shrink-0 flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                                    <button onClick={() => setSelectedFile(null)} className="md:hidden p-2 hover:bg-white/10 rounded-full">
                                        <ArrowLeft size={20} />
                                    </button>
                                    <BookOpen size={20} className="text-orange-400" />
                                    <h2 className="text-lg font-semibold truncate">{selectedFile.name}</h2>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                    {contentLoading ? (
                                        <div className="flex items-center justify-center h-full">
                                            <Loader2 className="animate-spin text-orange-400" size={40} />
                                        </div>
                                    ) : (
                                        <div className="prose prose-invert max-w-none prose-pre:bg-[#1e1e1e] prose-headings:text-white/90 prose-p:text-white/70 prose-li:text-white/70 prose-strong:text-orange-200">
                                            <ReactMarkdown
                                                components={{
                                                    code({ node, inline, className, children, ...props }) {
                                                        const match = /language-(\w+)/.exec(className || '')
                                                        return !inline && match ? (
                                                            <SyntaxHighlighter
                                                                {...props}
                                                                children={String(children).replace(/\n$/, '')}
                                                                style={vscDarkPlus}
                                                                language={match[1]}
                                                                PreTag="div"
                                                            />
                                                        ) : (
                                                            <code {...props} className={className}>
                                                                {children}
                                                            </code>
                                                        )
                                                    }
                                                }}
                                            >
                                                {content}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-white/30">
                                <User size={48} className="mb-4 opacity-50" />
                                <p>Select a question or topic to view guidance</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BehavioralPage;
