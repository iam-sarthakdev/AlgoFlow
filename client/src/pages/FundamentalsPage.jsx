import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code2, FileText, ChevronRight, Github, Loader2, Box, Cpu, Database, Network, FileCode, ArrowLeft, Menu, Hash, ChevronDown } from 'lucide-react';
import contentService from '../services/contentService';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const FundamentalsPage = () => {
    const [activeTab, setActiveTab] = useState('os'); // Default to OS as requested
    const [loading, setLoading] = useState(false);
    const [synced, setSynced] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [contentLoading, setContentLoading] = useState(false);
    const [error, setError] = useState(null);

    // Topics with enhanced visuals
    const tabs = [
        { id: 'os', label: 'Operating Systems', icon: Cpu, color: 'text-violet-400', gradient: 'from-violet-500/20 to-purple-500/5', border: 'border-violet-500/20' },
        { id: 'dbms', label: 'DBMS', icon: Database, color: 'text-emerald-400', gradient: 'from-emerald-500/20 to-teal-500/5', border: 'border-emerald-500/20' },
        { id: 'cn', label: 'Networks', icon: Network, color: 'text-cyan-400', gradient: 'from-cyan-500/20 to-blue-500/5', border: 'border-cyan-500/20' },
        { id: 'oops', label: 'OOPs', icon: Box, color: 'text-rose-400', gradient: 'from-rose-500/20 to-red-500/5', border: 'border-rose-500/20' },
        { id: 'sql', label: 'SQL', icon: FileCode, color: 'text-amber-400', gradient: 'from-amber-500/20 to-orange-500/5', border: 'border-amber-500/20' }
    ];

    const currentTab = tabs.find(t => t.id === activeTab);

    // Fetch content when tab changes
    useEffect(() => {
        handleSync(activeTab);
    }, [activeTab]);

    const handleSync = async (topicId) => {
        setLoading(true);
        setError(null);
        setSelectedFile(null); // Reset selection on tab switch
        try {
            const response = await contentService.getFundamentals(topicId);
            if (response.data && response.data.length > 0) {
                const validFiles = response.data
                    .filter(f => f.name !== 'Add Contents.txt')
                    // Sort numerically if possible (01, 02...)
                    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

                setFiles(validFiles);
                setSynced(true);
            } else {
                setFiles([]);
                if (!synced) setError("No content found for this section.");
            }
        } catch (error) {
            console.error("Sync failed:", error);
            setError("Failed to sync content.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileClick = async (file) => {
        if (file.type === 'dir') return;

        setSelectedFile(file);
        setContentLoading(true);
        try {
            const isBinary = /\.(pdf|png|jpg|jpeg|gif|zip|rar)$/i.test(file.name);

            if (isBinary) {
                setFileContent(null);
            } else {
                const response = await contentService.getFileContent(file.path);
                setFileContent(response.content);
            }
        } catch (error) {
            console.error("Failed to load file:", error);
        } finally {
            setContentLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] bg-[#050505] overflow-hidden font-sans">

            {/* Sidebar nav area - Glassmorphism */}
            <div className="w-80 flex flex-col border-r border-white/5 bg-[#0a0a0b]/80 backdrop-blur-xl relative z-20">
                {/* Topic Selector */}
                <div className="p-4 space-y-3">
                    <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest px-2 font-mono">Module</h2>
                    <div className="flex flex-col gap-1">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 w-full text-left
                                        ${isActive
                                            ? `bg-gradient-to-r ${tab.gradient} text-white border border-white/5 shadow-lg shadow-black/20`
                                            : 'text-white/50 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${isActive ? 'bg-black/20 text-white' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                        <tab.icon size={18} className={isActive ? tab.color : ''} />
                                    </div>
                                    <span className="font-medium tracking-wide">{tab.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="h-px bg-white/5 w-full my-1" />

                {/* Chapter List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-1">
                    <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest px-2 mb-3 mt-2 font-mono">Chapters</h2>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-2 text-white/20">
                            <Loader2 size={24} className="animate-spin" />
                            <span className="text-xs">Loading syllabus...</span>
                        </div>
                    ) : error ? (
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    ) : files.length === 0 ? (
                        <div className="text-center py-12 text-white/20 italic text-sm">
                            Select a module to view chapters
                        </div>
                    ) : (
                        <div className="space-y-1 pb-10">
                            {files.map((file, idx) => {
                                const isSelected = selectedFile?.path === file.path;
                                return (
                                    <motion.button
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={file.path}
                                        onClick={() => handleFileClick(file)}
                                        className={`w-full text-left p-3 rounded-lg text-sm flex items-start gap-3 transition-all duration-200 border border-transparent
                                            ${isSelected
                                                ? 'bg-white/10 text-white border-white/5 shadow-xl'
                                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                                            }`}
                                    >
                                        <div className={`mt-0.5 min-w-[20px] h-5 flex items-center justify-center rounded text-[10px] font-bold border
                                            ${isSelected
                                                ? 'bg-black/40 border-white/20 text-white'
                                                : 'bg-white/5 border-white/5 text-white/30'
                                            }`}>
                                            {idx + 1}
                                        </div>
                                        <span className="leading-relaxed line-clamp-2">{file.name}</span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area - The "Book" */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#050505] relative">
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] pointer-events-none rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] pointer-events-none rounded-full" />

                {selectedFile ? (
                    <div className="max-w-5xl mx-auto px-12 py-16 min-h-full relative z-10">
                        {/* Header Section */}
                        <div className="mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-sm text-purple-400 font-mono mb-4 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit"
                            >
                                <Hash size={12} />
                                <span className="uppercase tracking-wider">{currentTab?.label || 'Module'}</span>
                                <span className="text-white/20">/</span>
                                <span>CHAPTER {files.indexOf(selectedFile) + 1}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl font-bold text-white tracking-tight leading-tight mb-6"
                            >
                                {selectedFile.name}
                            </motion.h1>

                            {/* Action Bar */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center justify-between border-b border-white/10 pb-8"
                            >
                                <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                                    <span>READ TIME: ~15 MIN</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                                    <span>UPDATED: TODAY</span>
                                </div>
                                <a
                                    href={selectedFile.url || `https://github.com/AkashSingh3031/The-Complete-FAANG-Preparation/blob/master/${selectedFile.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1E] hover:bg-[#252529] border border-white/10 rounded-lg text-slate-300 transition-all text-xs font-medium group"
                                >
                                    <Github size={14} className="group-hover:text-white transition-colors" />
                                    <span>View Source</span>
                                </a>
                            </motion.div>
                        </div>

                        {/* Content Body */}
                        {contentLoading ? (
                            <div className="flex flex-col items-center justify-center h-64 gap-4 text-white/30">
                                <Loader2 size={40} className="animate-spin text-purple-500" />
                                <span className="animate-pulse">Rendering chapter content...</span>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="prose-custom pb-20"
                            >
                                {fileContent === null ? (
                                    <div className="glass-card p-12 text-center border border-white/10 rounded-2xl bg-gradient-to-b from-white/5 to-transparent">
                                        <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/10 border border-white/5">
                                            <FileText size={40} className="text-white drop-shadow-lg" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Resource File</h3>
                                        <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                                            This content ({selectedFile.name.split('.').pop()?.toUpperCase()}) is available for download or external viewing.
                                        </p>
                                        <a
                                            href={selectedFile.url || `https://github.com/AkashSingh3031/The-Complete-FAANG-Preparation/raw/master/${selectedFile.path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-slate-200 rounded-xl transition-all font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1"
                                        >
                                            <span>Access Resource</span>
                                            <ChevronRight size={16} />
                                        </a>
                                    </div>
                                ) : (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            code({ node, inline, className, children, ...props }) {
                                                const match = /language-(\w+)/.exec(className || '')
                                                return !inline && match ? (
                                                    <div className="relative group my-8 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                                                        <div className="absolute top-0 left-0 right-0 h-10 bg-[#1e1e20] flex items-center px-4 border-b border-white/5">
                                                            <div className="flex gap-1.5">
                                                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                                            </div>
                                                            <span className="ml-4 text-xs font-mono text-white/30 uppercase">{match[1]}</span>
                                                        </div>
                                                        <SyntaxHighlighter
                                                            {...props}
                                                            children={String(children).replace(/\n$/, '')}
                                                            style={vscDarkPlus}
                                                            language={match[1]}
                                                            PreTag="div"
                                                            customStyle={{
                                                                margin: 0,
                                                                padding: '3.5rem 1.5rem 1.5rem 1.5rem',
                                                                background: '#0f0f10',
                                                                fontSize: '0.9rem',
                                                                lineHeight: '1.6',
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <code {...props} className={className}>
                                                        {children}
                                                    </code>
                                                )
                                            }
                                        }}
                                    >
                                        {fileContent}
                                    </ReactMarkdown>
                                )}
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl opacity-50 rounded-full" />
                            <BookOpen size={80} className="text-white/10 relative z-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mt-8 mb-2">CS Fundamentals Master Guide</h2>
                        <p className="text-slate-500 max-w-md text-center">
                            Select a module from the sidebar to begin mastering core concepts with our textbook-quality guides.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FundamentalsPage;
