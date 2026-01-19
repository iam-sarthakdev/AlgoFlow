import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ListChecks,
    Code,
    ExternalLink,
    Github,
    FileText,
    CheckCircle2,
    Loader2,
    ArrowLeft,
    BookOpen,
    Folder,
    ChevronRight,
    Home,
    FileCode
} from 'lucide-react';
import { Link } from 'react-router-dom';
import contentService from '../services/contentService';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DSAPrepPage = () => {
    // State
    const [pathStack, setPathStack] = useState([{ name: 'Root', path: '' }]);
    const [currentPath, setCurrentPath] = useState('');
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true); // Start loading immediately
    const [contentLoading, setContentLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState('');

    // Initial load - Auto fetch
    useEffect(() => {
        fetchPath('', true);
    }, []);

    const fetchPath = async (path, isRoot = false) => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (isRoot) {
                // Initial Sync (Get root of DSA section)
                const response = await contentService.getDSA('');
                data = response.data;
                setPathStack([{ name: 'Collections', path: '' }]);
                setCurrentPath('');
            } else {
                const targetPath = path.startsWith('DSA:') ? path : `DSA:${path}`;
                const response = await contentService.getDSA(targetPath);
                data = response.data;
            }

            if (data && Array.isArray(data)) {
                // Sort: Folders first, then files
                const sorted = data.sort((a, b) => {
                    if (a.type === b.type) return a.name.localeCompare(b.name);
                    return a.type === 'dir' ? -1 : 1;
                });
                setFiles(sorted);
                setSelectedFile(null); // Clear file selection when changing folders
            } else {
                setError("Unable to load folder contents.");
            }

        } catch (err) {
            console.error("Fetch failed:", err);
            setError("Failed to load content. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleBreadcrumbClick = (index) => {
        const newStack = pathStack.slice(0, index + 1);
        const target = newStack[newStack.length - 1];
        setPathStack(newStack);
        setCurrentPath(target.path);

        if (target.path === '') {
            fetchPath('', true);
        } else {
            fetchPath(target.path);
        }
    };

    const handleItemClick = async (item) => {
        if (item.type === 'dir') {
            const newStack = [...pathStack, { name: item.name, path: item.path }];
            setPathStack(newStack);
            setCurrentPath(item.path);
            fetchPath(item.path);
        } else {
            setSelectedFile(item);

            // Check for binary extensions
            const binaryExtensions = ['.xlsx', '.xls', '.pdf', '.docx', '.doc', '.zip', '.rar', '.png', '.jpg', '.jpeg'];
            const isBinary = binaryExtensions.some(ext => item.name.toLowerCase().endsWith(ext));

            if (isBinary) {
                setFileContent(null);
                setContentLoading(false);
            } else {
                setContentLoading(true);
                try {
                    const targetPath = item.path.startsWith('DSA:') ? item.path : `DSA:${item.path}`;
                    const response = await contentService.getFileContent(targetPath);
                    setFileContent(response.content);
                } catch (err) {
                    console.error("Failed to load file:", err);
                    setFileContent("Error loading file content.");
                } finally {
                    setContentLoading(false);
                }
            }
        }
    };

    return (
        <div className="min-h-screen p-6 lg:p-10 max-w-[1600px] mx-auto pb-10 flex flex-col h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex-shrink-0"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-lg shadow-emerald-500/20">
                        <BookOpen className="text-white" size={24} />
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">DSA Sheets.</h1>
                </div>
                <p className="text-slate-400 text-lg">Curated roadmaps and resources for your preparation.</p>
            </motion.div>

            {/* Breadcrumbs */}
            <div className="flex-shrink-0 mb-6">
                <div className="flex items-center gap-2 text-sm bg-white/5 border border-white/5 p-2 rounded-xl overflow-x-auto no-scrollbar backdrop-blur-sm">
                    {pathStack.map((item, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <ChevronRight size={14} className="text-slate-600" />}
                            <button
                                onClick={() => handleBreadcrumbClick(index)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${index === pathStack.length - 1
                                        ? 'bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {index === 0 && <Home size={14} />}
                                {item.name}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-6 flex items-center gap-3"
                >
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    {error}
                </motion.div>
            )}

            {/* Main Area */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* List View */}
                <div className={`lg:col-span-4 glass-card overflow-hidden flex flex-col border border-white/5 ${selectedFile ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                        <h3 className="font-semibold text-white/80">Explorer</h3>
                        <span className="text-xs text-slate-500">{files.length} items</span>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-40 space-y-4">
                                <Loader2 size={32} className="animate-spin text-emerald-500" />
                                <span className="text-sm text-slate-500">Fetching resources...</span>
                            </div>
                        ) : (
                            <AnimatePresence>
                                {files.map((item, index) => (
                                    <motion.button
                                        key={item.path}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        onClick={() => handleItemClick(item)}
                                        className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all group border ${selectedFile?.path === item.path
                                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                                : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white hover:border-white/5'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${item.type === 'dir'
                                                ? 'bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20'
                                                : 'bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20'
                                            } transition-colors`}>
                                            {item.type === 'dir' ? <Folder size={18} /> : <FileCode size={18} />}
                                        </div>
                                        <span className="truncate font-medium text-sm flex-1">{item.name}</span>
                                        {item.type === 'dir' && <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />}
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        )}
                        {!loading && files.length === 0 && (
                            <div className="text-center py-20 text-slate-600">
                                <Folder size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Empty directory</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview Area */}
                <div className={`lg:col-span-8 glass-card overflow-hidden flex flex-col border border-white/5 ${selectedFile ? 'flex' : 'hidden lg:flex'}`}>
                    {selectedFile ? (
                        <div className="flex flex-col h-full">
                            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between backdrop-blur-md sticky top-0 z-10">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <button
                                        onClick={() => setSelectedFile(null)}
                                        className="lg:hidden p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft size={18} className="text-white" />
                                    </button>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                            <FileCode size={18} />
                                        </div>
                                        <div>
                                            <span className="font-semibold text-white block truncate max-w-[200px] md:max-w-md">{selectedFile.name}</span>
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href={selectedFile.url || `https://github.com/AkashSingh3031/The-Complete-FAANG-Preparation/blob/master/${selectedFile.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/80 transition-all border border-white/5 hover:border-white/10"
                                >
                                    <Github size={16} />
                                    <span className="hidden sm:inline">Open in GitHub</span>
                                </a>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#0a0a0b]">
                                {contentLoading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="flex flex-col items-center gap-4">
                                            <Loader2 size={40} className="animate-spin text-emerald-500" />
                                            <span className="text-slate-500 animate-pulse">Loading content...</span>
                                        </div>
                                    </div>
                                ) : fileContent === null ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                                        <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center">
                                            <FileText size={40} className="text-slate-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Binary File Detected</h3>
                                            <p className="text-slate-400 max-w-sm mx-auto">
                                                This file format cannot be previewed. Please view it on GitHub.
                                            </p>
                                        </div>
                                        <a
                                            href={selectedFile.url || `https://github.com/GFGSC-RTU/All-DSA-Sheets/blob/master/${selectedFile.path.replace('DSA:', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                                        >
                                            <Github size={20} />
                                            <span>View on GitHub</span>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="prose prose-invert max-w-none prose-pre:bg-[#161618] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-a:text-emerald-400 hover:prose-a:text-emerald-300 prose-code:text-emerald-300 prose-strong:text-white">
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
                                                            customStyle={{ margin: 0, borderRadius: '0.75rem', background: '#161618' }}
                                                        />
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
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-6 text-center bg-white/[0.02]">
                            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 animate-pulse">
                                <ListChecks size={40} className="text-slate-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Select a Sheet</h3>
                            <p className="text-slate-400 max-w-sm">Browse the folders on the left to specific view problem sheets, guides, and resources.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DSAPrepPage;
