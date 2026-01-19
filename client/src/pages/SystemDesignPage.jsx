import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Loader2, PlayCircle, BookOpen, Layers, GitBranch, Cpu, Database, Server, Smartphone, Code2 } from 'lucide-react';
import Sidebar from '../components/SystemDesign/Sidebar';
import ContentRenderer from '../components/SystemDesign/ContentRenderer';
import { systemDesignAPI } from '../services/api';
import contentService from '../services/contentService';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SystemDesignPage = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState(null);
    const [activeFile, setActiveFile] = useState('index.md');
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [mode, setMode] = useState('hld'); // 'hld' or 'lld'

    // LLD State
    const [lldFiles, setLldFiles] = useState([]);
    const [lldLoading, setLldLoading] = useState(false);

    // Progress State
    const [completedTopics, setCompletedTopics] = useState([]);
    const [loadingProgress, setLoadingProgress] = useState(true);

    // Hardcoded LLD Mapping for better visual structure
    const lldStructure = {
        'Basics': ['01-intro.md'],
        'SOLID Principles': [
            '02-solid-srp.md',
            '03-solid-ocp.md',
            '04-solid-lsp.md',
            '05-solid-isp.md',
            '06-solid-dip.md'
        ],
        'Design Patterns': [
            '07-patterns-creational.md',
            '08-patterns-structural.md',
            '09-patterns-behavioral.md',
            '11-patterns-advanced.md'
        ],
        'UML Diagrams': ['10-uml-diagrams.md'],
        'GRASP Principles': ['12-grasp-principles.md'],
        'Real-World Cases': [
            '13-case-parking-lot.md',
            '14-case-library.md'
        ]
    };

    // Construct LLD Categories for Sidebar based on fetched files
    const getLLDCategories = () => {
        // If using local structure, we build categories from lldStructure
        if (!lldFiles.length && mode === 'lld') {
            // Fallback or initial state if files aren't set yet
        }

        const categories = [];

        // Parse the hardcoded structure into the format Sidebar expects
        Object.entries(lldStructure).forEach(([category, files]) => {
            const items = files.map(file => {
                // Create readable label
                const label = file.replace(/^\d+-/, '').replace(/-/g, ' ').replace('.md', '').replace('solid ', 'SOLID: ').replace('uml ', 'UML: ');
                // Capitalize first letter
                const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);

                return {
                    file: file,
                    label: formattedLabel,
                    icon: category.includes('SOLID') ? GitBranch :
                        category.includes('Pattern') ? Layers :
                            category.includes('UML') ? FileText : Code2,
                    path: file
                };
            });

            categories.push({
                title: category,
                items: items
            });
        });

        return categories;
    };

    const lldCategories = getLLDCategories();

    // Handle responsive sidebar
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch Progress
    useEffect(() => {
        const loadProgress = async () => {
            try {
                setLoadingProgress(true);
                const data = await systemDesignAPI.getProgress();
                setCompletedTopics(data.completedTopics || []);
            } catch (err) {
                console.error("Failed to load progress:", err);
            } finally {
                setLoadingProgress(false);
            }
        };
        loadProgress();
    }, []);

    // Set LLD Files from local structure when switching to LLD mode
    useEffect(() => {
        if (mode === 'lld') {
            const allFiles = Object.values(lldStructure).flat().map(name => ({
                name,
                path: name,
                type: 'file'
            }));

            setLldFiles(allFiles);

            // Set initial active file if none selected
            if (!activeFile || activeFile === 'index.md') {
                setActiveFile(allFiles[0].path);
            }
        }
    }, [mode]);

    const handleToggle = async (topicId) => {
        try {
            const isCompleted = completedTopics.includes(topicId);
            const newTopics = isCompleted ? completedTopics.filter(id => id !== topicId) : [...completedTopics, topicId];
            setCompletedTopics(newTopics);
            await systemDesignAPI.toggleTopic(topicId);
        } catch (err) {
            console.error("Failed to toggle topic:", err);
        }
    };

    // Main Content Fetcher
    useEffect(() => {
        if (!activeFile) return;

        const fetchContent = async () => {
            setLoading(true);
            setError(null);
            try {
                if (mode === 'lld') {
                    // Fetch local LLD Content
                    const response = await fetch(`/system-design-data/lld/${activeFile}`);
                    if (!response.ok) throw new Error('Failed to load content');
                    const text = await response.text();
                    setContent(text);
                } else {
                    // HLD Content Logic
                    let url = activeFile === 'index.md'
                        ? '/system-design-data/index.md'
                        : `/system-design-data/${activeFile}`;

                    if (activeFile.startsWith('solutions/')) {
                        url = `/system-design-data/${activeFile}`;
                    }

                    const response = await fetch(url);
                    if (!response.ok) throw new Error('Failed to load content');
                    const text = await response.text();
                    setContent(text);
                }
            } catch (err) {
                console.error('Error loading content:', err);
                setError('Failed to load content.');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [activeFile, mode]);

    const handleSectionChange = (itemOrLink) => {
        if (typeof itemOrLink === 'object') {
            // Handle Sidebar object click
            // The sidebar items for LLD usually have { file: ... } 
            // HLD items might have { id: ... } or { file: ... }

            if (itemOrLink.file || itemOrLink.path) {
                setActiveFile(itemOrLink.file || itemOrLink.path);
                setActiveSection(null);
            } else if (itemOrLink.id) {
                setActiveFile('index.md');
                setActiveSection(itemOrLink.id);
                setTimeout(() => {
                    const element = document.getElementById(itemOrLink.id);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
            if (isMobile) setIsSidebarOpen(false);
        } else if (typeof itemOrLink === 'string') {
            // Handle internal markdown links
            if (itemOrLink.startsWith('#')) {
                const id = itemOrLink.substring(1);
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            } else {
                let path = itemOrLink;
                if (path.startsWith('./')) path = path.slice(2);
                setActiveFile(path);
                window.scrollTo(0, 0);
            }
        }
    };

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden">
            <div className="flex flex-col w-full h-full">
                {/* Header Toggle */}
                <div className="flex-shrink-0 z-20 px-6 py-4 bg-[#0a0a0b]/50 backdrop-blur-md border-b border-white/5 flex justify-center">
                    <div className="bg-white/5 p-1 rounded-xl flex shadow-inner">
                        <button
                            onClick={() => { setMode('hld'); setActiveFile('index.md'); }}
                            className={`flex items-center gap-2 px-8 py-2.5 rounded-lg transition-all font-medium text-sm ${mode === 'hld'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <Server size={16} />
                            <span>High Level (HLD)</span>
                        </button>
                        <button
                            onClick={() => { setMode('lld'); setActiveFile(''); }}
                            className={`flex items-center gap-2 px-8 py-2.5 rounded-lg transition-all font-medium text-sm ${mode === 'lld'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <Cpu size={16} />
                            <span>Low Level (LLD)</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden relative">
                    {/* Mobile Toggle */}
                    {isMobile && (
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-xl shadow-primary/30"
                        >
                            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}

                    {/* Sidebar */}
                    <AnimatePresence mode='wait'>
                        {(isSidebarOpen || !isMobile) && (
                            <motion.div
                                initial={isMobile ? { x: -300, opacity: 0 } : false}
                                animate={{ x: 0, opacity: 1 }}
                                exit={isMobile ? { x: -300, opacity: 0 } : false}
                                className={`
                                    ${isMobile ? 'fixed inset-y-0 left-0 z-40 w-[85%] max-w-sm pt-4' : 'w-80 relative'}
                                    bg-[#0a0a0b] flex-shrink-0 border-r border-white/5 overflow-hidden flex flex-col
                                `}
                            >
                                <div className="p-4 border-b border-white/5">
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent flex items-center gap-2">
                                        <Layers className="text-primary" size={24} />
                                        {mode === 'hld' ? 'System Architecture' : 'Object Oriented Design'}
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {mode === 'hld' ? 'Scalability & Reliability' : 'Patterns & Principles'}
                                    </p>
                                </div>

                                <Sidebar
                                    categories={mode === 'lld' ? lldCategories : null}
                                    activeSection={activeSection}
                                    activeFile={activeFile}
                                    onSectionChange={handleSectionChange}
                                    completedTopics={completedTopics}
                                    onToggle={handleToggle}
                                    loadingProgress={loadingProgress}
                                    className="flex-1"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto min-w-0 custom-scrollbar bg-[#0a0a0b] scroll-smooth">
                        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center h-96">
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-primary">
                                            <Database size={20} />
                                        </div>
                                    </div>
                                    <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading modules...</p>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center h-96 text-center">
                                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                                        <Server size={32} className="text-red-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Content Unavailable</h3>
                                    <p className="text-slate-400 max-w-md">{error}</p>
                                </div>
                            ) : (
                                mode === 'lld' ? (
                                    <div className="max-w-4xl mx-auto pb-20">
                                        <ReactMarkdown
                                            remarkPlugins={[]}
                                            components={{
                                                h1: ({ node, ...props }) => (
                                                    <h1 className="text-4xl md:text-5xl font-black mb-8 pb-6 border-b border-white/10 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent" {...props} />
                                                ),
                                                h2: ({ node, ...props }) => (
                                                    <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-white flex items-center gap-3" {...props}>
                                                        <span className="w-2 h-8 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500 block"></span>
                                                        {props.children}
                                                    </h2>
                                                ),
                                                h3: ({ node, ...props }) => (
                                                    <h3 className="text-xl font-bold mt-8 mb-4 text-emerald-300 flex items-center gap-2" {...props}>
                                                        <span className="text-emerald-500/50">#</span>
                                                        {props.children}
                                                    </h3>
                                                ),
                                                p: ({ node, ...props }) => (
                                                    <p className="text-slate-300 text-lg leading-8 mb-6 font-light tracking-wide" {...props} />
                                                ),
                                                ul: ({ node, ...props }) => (
                                                    <ul className="space-y-3 mb-8 ml-2" {...props} />
                                                ),
                                                ol: ({ node, ...props }) => (
                                                    <ol className="space-y-3 mb-8 ml-2 list-decimal list-inside text-slate-300 marker:text-emerald-500 marker:font-bold" {...props} />
                                                ),
                                                li: ({ node, ...props }) => (
                                                    <li className="text-slate-300 text-lg leading-7 flex items-start gap-3 pl-2" {...props}>
                                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 block" />
                                                        <span>{props.children}</span>
                                                    </li>
                                                ),
                                                blockquote: ({ node, ...props }) => (
                                                    <blockquote className="my-8 p-6 bg-emerald-500/5 border-l-4 border-emerald-500 rounded-r-2xl backdrop-blur-sm relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                                            <BookOpen size={64} className="text-emerald-500" />
                                                        </div>
                                                        <p className="text-emerald-100 italic relative z-10 m-0 font-medium text-lg leading-relaxed">
                                                            {props.children}
                                                        </p>
                                                    </blockquote>
                                                ),
                                                strong: ({ node, ...props }) => (
                                                    <strong className="font-bold text-white border-b border-emerald-500/30 pb-0.5" {...props} />
                                                ),
                                                code({ node, inline, className, children, ...props }) {
                                                    const match = /language-(\w+)/.exec(className || '')
                                                    return !inline && match ? (
                                                        <div className="my-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0e0e0e]">
                                                            {/* Mac-like Header */}
                                                            <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-white/5">
                                                                <div className="flex gap-2">
                                                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                                                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                                                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                                                </div>
                                                                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                                                                    {match[1]}
                                                                </div>
                                                                <div className="w-8" /> {/* Spacer for centering */}
                                                            </div>
                                                            <div className="relative group">
                                                                <SyntaxHighlighter
                                                                    {...props}
                                                                    children={String(children).replace(/\n$/, '')}
                                                                    style={vscDarkPlus}
                                                                    language={match[1]}
                                                                    PreTag="div"
                                                                    customStyle={{
                                                                        margin: 0,
                                                                        padding: '1.5rem',
                                                                        background: '#0e0e0e',
                                                                        fontSize: '0.95rem',
                                                                        lineHeight: '1.6'
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="px-2 py-1 mx-1 rounded-md bg-white/10 text-emerald-300 font-mono text-sm border border-white/5">
                                                            {children}
                                                        </span>
                                                    )
                                                },
                                                table: ({ node, ...props }) => (
                                                    <div className="overflow-x-auto my-8 rounded-xl border border-white/10">
                                                        <table className="w-full text-left border-collapse" {...props} />
                                                    </div>
                                                ),
                                                thead: ({ node, ...props }) => (
                                                    <thead className="bg-white/5 text-white" {...props} />
                                                ),
                                                th: ({ node, ...props }) => (
                                                    <th className="px-6 py-4 font-bold border-b border-white/10 text-sm uppercase tracking-wider" {...props} />
                                                ),
                                                td: ({ node, ...props }) => (
                                                    <td className="px-6 py-4 border-b border-white/5 text-slate-300" {...props} />
                                                )
                                            }}
                                        >
                                            {content}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <ContentRenderer
                                        content={content}
                                        onLinkClick={handleSectionChange}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemDesignPage;
