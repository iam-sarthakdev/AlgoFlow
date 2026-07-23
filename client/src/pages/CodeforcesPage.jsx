import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, ExternalLink, Trash2, Edit2, Eye, EyeOff, X, Save, Code2, Tag, ChevronDown, CheckCircle, Filter, Zap, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { codeforcesAPI } from '../services/codeforcesApi';
import CodeEditor from '../components/CodeEditor';
import toast from 'react-hot-toast';

const CF_TOPICS = ['DP','Graphs','Greedy','Constructive','Math','Binary Search','Brute Force','Data Structures','Trees','Strings','Number Theory','Combinatorics','Geometry','Sortings','Two Pointers','Bitmasks','DFS and Similar','Shortest Paths','Hashing','Games','Implementation','Interactive','Probabilities','Divide and Conquer','DSU','Flows','Matrices','FFT','Segment Tree'];

const DIFFICULTY_COLORS = {
    800:'#808080',900:'#808080',1000:'#008000',1100:'#008000',
    1200:'#03a89e',1300:'#03a89e',1400:'#0000ff',1500:'#0000ff',
    1600:'#aa00aa',1700:'#aa00aa',1800:'#aa00aa',1900:'#ff8c00',
    2000:'#ff8c00',2100:'#ff8c00',2200:'#ff0000',2300:'#ff0000',
    2400:'#ff0000',2500:'#a50000',2600:'#a50000',2700:'#a50000',
    2800:'#a50000',2900:'#a50000',3000:'#a50000',3500:'#a50000'
};

const getDiffColor = (d) => {
    const keys = Object.keys(DIFFICULTY_COLORS).map(Number).sort((a,b)=>a-b);
    let color = '#808080';
    for(const k of keys){ if(d>=k) color=DIFFICULTY_COLORS[k]; }
    return color;
};

const getDiffLabel = (d) => {
    if(d<1200) return 'Newbie'; if(d<1400) return 'Pupil'; if(d<1600) return 'Specialist';
    if(d<1900) return 'Expert'; if(d<2100) return 'Candidate Master'; if(d<2400) return 'Master';
    if(d<2600) return 'International Master'; if(d<3000) return 'Grandmaster'; return 'Legendary';
};

// Sortable problem row component
const SortableItem = ({ p, i, revealed, toggleReveal, toggleSolved, setSolutionModal, openEdit, handleDelete, getDiffColor, getDiffLabel }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: p._id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        opacity: isDragging ? 0.85 : 1,
    };
    const diffColor = getDiffColor(p.difficulty);

    return (
        <div ref={setNodeRef} style={style} className={`glass-card p-5 border transition-all duration-300 group ${isDragging ? 'border-cyan-500/40 shadow-lg shadow-cyan-500/10' : 'border-white/5 hover:border-white/10'}`}>
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Drag Handle */}
                    <button {...attributes} {...listeners} className="flex-shrink-0 p-1 cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-300 transition-colors touch-none" title="Drag to reorder">
                        <GripVertical size={18}/>
                    </button>
                    {/* Solved Toggle */}
                    <button onClick={()=>toggleSolved(p)} className="flex-shrink-0">
                        <CheckCircle size={22} className={`transition-colors ${p.isSolved ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'}`}/>
                    </button>
                    {/* Name & Link */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <a href={p.url} target="_blank" rel="noopener noreferrer"
                                className="font-bold text-white hover:text-cyan-400 transition-colors truncate" onClick={e=>e.stopPropagation()}>
                                {p.name}
                            </a>
                            <ExternalLink size={14} className="text-slate-500 flex-shrink-0"/>
                        </div>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                            {revealed ? (
                                <>
                                    <span className="px-2.5 py-1 rounded-full text-xs font-bold border" style={{color:diffColor, borderColor:diffColor+'60', backgroundColor:diffColor+'20'}}>
                                        {p.difficulty} · {getDiffLabel(p.difficulty)}
                                    </span>
                                    {p.topics.map(t=>(
                                        <span key={t} className="px-2.5 py-1 rounded-full text-xs bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-medium">{t}</span>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <span className="px-2.5 py-1 rounded-full text-xs font-bold border border-white/10 bg-white/5 text-slate-500">● ● ● ●</span>
                                    {p.topics.length > 0 && <span className="px-2.5 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-slate-500">{p.topics.length} tag{p.topics.length>1?'s':''} hidden</span>}
                                </>
                            )}
                            <button onClick={()=>toggleReveal(p._id)} className="p-1 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-colors" title={revealed?'Hide':'Reveal'}>
                                {revealed ? <EyeOff size={14}/> : <Eye size={14}/>}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button onClick={()=>setSolutionModal({...p, solution:p.solution||''})}
                        className="p-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 rounded-lg transition-colors" title="View/Edit Solution">
                        <Code2 size={16}/>
                    </button>
                    <button onClick={()=>openEdit(p)}
                        className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors" title="Edit">
                        <Edit2 size={16}/>
                    </button>
                    <button onClick={()=>handleDelete(p._id)}
                        className="p-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={16}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

const CodeforcesPage = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [topicFilter, setTopicFilter] = useState('');
    const [solvedFilter, setSolvedFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProblem, setEditingProblem] = useState(null);
    const [solutionModal, setSolutionModal] = useState(null);
    const [revealedIds, setRevealedIds] = useState(new Set());
    const [topicDropdown, setTopicDropdown] = useState(false);
    const [form, setForm] = useState({ name:'', url:'', difficulty:'', topics:[], solution:'', notes:'' });

    // Drag-and-drop sensors
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = problems.findIndex(p => p._id === active.id);
        const newIndex = problems.findIndex(p => p._id === over.id);
        const newProblems = arrayMove(problems, oldIndex, newIndex);

        // Optimistic update
        setProblems(newProblems);

        // Persist to backend
        try {
            await codeforcesAPI.reorder(newProblems.map(p => p._id));
        } catch (e) {
            toast.error('Failed to save order');
            loadProblems(); // revert
        }
    };

    const loadProblems = useCallback(async () => {
        try {
            setLoading(true);
            const filters = {};
            if(search) filters.search = search;
            if(topicFilter) filters.topic = topicFilter;
            if(solvedFilter) filters.isSolved = solvedFilter;
            const data = await codeforcesAPI.getProblems(filters);
            setProblems(data.problems || []);
        } catch(e) {
            console.error(e);
            toast.error('Failed to load problems');
        } finally { setLoading(false); }
    }, [search, topicFilter, solvedFilter]);

    useEffect(() => {
        const t = setTimeout(loadProblems, 400);
        return () => clearTimeout(t);
    }, [loadProblems]);

    const toggleReveal = (id) => {
        setRevealedIds(prev => {
            const s = new Set(prev);
            s.has(id) ? s.delete(id) : s.add(id);
            return s;
        });
    };

    const openAdd = () => {
        setEditingProblem(null);
        setForm({ name:'', url:'', difficulty:'', topics:[], solution:'', notes:'' });
        setShowModal(true);
    };

    const openEdit = (p) => {
        setEditingProblem(p);
        setForm({ name:p.name, url:p.url, difficulty:String(p.difficulty), topics:[...p.topics], solution:p.solution||'', notes:p.notes||'' });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!form.name||!form.url||!form.difficulty) return toast.error('Fill required fields');
        try {
            if(editingProblem) {
                await codeforcesAPI.updateProblem(editingProblem._id, form);
                toast.success('Problem updated!');
            } else {
                await codeforcesAPI.createProblem(form);
                toast.success('Problem added!');
            }
            setShowModal(false);
            loadProblems();
        } catch(e) { toast.error(e.response?.data?.message || 'Failed'); }
    };

    const handleDelete = async (id) => {
        if(!window.confirm('Delete this problem?')) return;
        try {
            await codeforcesAPI.deleteProblem(id);
            toast.success('Deleted!');
            loadProblems();
        } catch(e) { toast.error('Failed to delete'); }
    };

    const toggleSolved = async (p) => {
        try {
            await codeforcesAPI.updateProblem(p._id, { isSolved: !p.isSolved });
            loadProblems();
        } catch(e) { toast.error('Failed'); }
    };

    const saveSolution = async () => {
        if(!solutionModal) return;
        try {
            await codeforcesAPI.updateProblem(solutionModal._id, { solution: solutionModal.solution });
            toast.success('Solution saved!');
            setSolutionModal(null);
            loadProblems();
        } catch(e) { toast.error('Failed to save'); }
    };

    const addTopic = (t) => {
        if(!form.topics.includes(t)) setForm(f=>({...f, topics:[...f.topics, t]}));
        setTopicDropdown(false);
    };

    const removeTopic = (t) => setForm(f=>({...f, topics:f.topics.filter(x=>x!==t)}));

    const stats = {
        total: problems.length,
        solved: problems.filter(p=>p.isSolved).length,
        avgDiff: problems.length ? Math.round(problems.reduce((s,p)=>s+p.difficulty,0)/problems.length) : 0
    };

    return (
        <div className="min-h-screen p-6 lg:p-10 max-w-[1800px] mx-auto pb-20">
            {/* Header */}
            <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="mb-10">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/30">
                            <Zap className="text-white" size={28}/>
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                                Codeforces Problems
                            </h1>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-slate-400 text-sm font-medium">{stats.total} Total</span>
                                <span className="w-1 h-1 rounded-full bg-slate-600"/>
                                <span className="text-emerald-400 text-sm font-medium">{stats.solved} Solved</span>
                                <span className="w-1 h-1 rounded-full bg-slate-600"/>
                                <span className="text-cyan-400 text-sm font-medium">Avg {stats.avgDiff}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={openAdd} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300">
                        <Plus size={20}/> Add Problem
                    </button>
                </div>

                {/* Filters */}
                <div className="glass-card p-6 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" size={18}/>
                            <input type="text" placeholder="Search problems..." value={search} onChange={e=>setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-[#0a0a0b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"/>
                        </div>
                        <select value={topicFilter} onChange={e=>setTopicFilter(e.target.value)}
                            className="py-3 px-4 bg-[#0a0a0b] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer">
                            <option value="">All Topics</option>
                            {CF_TOPICS.map(t=><option key={t} value={t}>{t}</option>)}
                        </select>
                        <select value={solvedFilter} onChange={e=>setSolvedFilter(e.target.value)}
                            className="py-3 px-4 bg-[#0a0a0b] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer">
                            <option value="">All Status</option>
                            <option value="true">Solved</option>
                            <option value="false">Unsolved</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Problems List */}
            {loading ? (
                <div className="space-y-3">{[...Array(5)].map((_,i)=>(
                    <div key={i} className="glass-card p-5 animate-pulse"><div className="h-6 bg-white/10 rounded w-3/4 mb-3"/><div className="flex gap-2"><div className="h-5 bg-white/10 rounded w-16"/><div className="h-5 bg-white/10 rounded w-20"/></div></div>
                ))}</div>
            ) : problems.length === 0 ? (
                <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="glass-card p-20 text-center border border-white/10">
                    <div className="text-6xl mb-6">⚡</div>
                    <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">No problems yet</h3>
                    <p className="text-slate-400 mb-8">Add your first Codeforces problem to start tracking</p>
                    <button onClick={openAdd} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-300">
                        Add Your First Problem
                    </button>
                </motion.div>
            ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={problems.map(p=>p._id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-3">
                            {problems.map((p, i) => (
                                <SortableItem key={p._id} p={p} i={i} revealed={revealedIds.has(p._id)} toggleReveal={toggleReveal} toggleSolved={toggleSolved} setSolutionModal={setSolutionModal} openEdit={openEdit} handleDelete={handleDelete} getDiffColor={getDiffColor} getDiffLabel={getDiffLabel} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={()=>setShowModal(false)}>
                        <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}}
                            className="w-full max-w-lg bg-[#121214] border border-white/10 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">{editingProblem ? 'Edit Problem' : 'Add CF Problem'}</h2>
                                <button onClick={()=>setShowModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X size={20} className="text-slate-400"/></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-1.5 block">Problem Name *</label>
                                    <input type="text" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. D - Yet Another Problem"
                                        className="w-full px-4 py-3 bg-[#0a0a0b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all" required/>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-1.5 block">Codeforces URL *</label>
                                    <input type="url" value={form.url} onChange={e=>setForm(f=>({...f,url:e.target.value}))} placeholder="https://codeforces.com/problemset/problem/..."
                                        className="w-full px-4 py-3 bg-[#0a0a0b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all" required/>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-1.5 block">Difficulty Rating *</label>
                                    <input type="number" value={form.difficulty} onChange={e=>setForm(f=>({...f,difficulty:e.target.value}))} placeholder="e.g. 1500" min="800" max="3500" step="100"
                                        className="w-full px-4 py-3 bg-[#0a0a0b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all" required/>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-1.5 block">Topics</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {form.topics.map(t=>(
                                            <span key={t} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                                                {t} <button type="button" onClick={()=>removeTopic(t)}><X size={12}/></button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <button type="button" onClick={()=>setTopicDropdown(!topicDropdown)}
                                            className="w-full px-4 py-3 bg-[#0a0a0b] border border-white/10 rounded-xl text-slate-400 text-left flex items-center justify-between hover:border-white/20 transition-all">
                                            <span>Add topic...</span><ChevronDown size={16}/>
                                        </button>
                                        {topicDropdown && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-[#121214] border border-white/10 rounded-xl max-h-48 overflow-y-auto z-50 shadow-2xl">
                                                {CF_TOPICS.filter(t=>!form.topics.includes(t)).map(t=>(
                                                    <button type="button" key={t} onClick={()=>addTopic(t)} className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">{t}</button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-1.5 block">Notes</label>
                                    <textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Any notes..." rows={2}
                                        className="w-full px-4 py-3 bg-[#0a0a0b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"/>
                                </div>
                                <button type="submit" className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all">
                                    {editingProblem ? 'Update Problem' : 'Add Problem'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Solution Modal */}
            <AnimatePresence>
                {solutionModal && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={()=>setSolutionModal(null)}>
                        <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}}
                            className="w-full max-w-3xl bg-[#121214] border border-white/10 rounded-2xl shadow-2xl flex flex-col" style={{height:'80vh'}} onClick={e=>e.stopPropagation()}>
                            <div className="flex items-center justify-between p-4 border-b border-white/10">
                                <div>
                                    <h2 className="text-lg font-bold text-white">{solutionModal.name}</h2>
                                    <span className="text-xs text-slate-400">Java Solution</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={saveSolution} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-sm font-medium transition-colors">
                                        <Save size={14}/> Save
                                    </button>
                                    <button onClick={()=>setSolutionModal(null)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X size={20} className="text-slate-400"/></button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <CodeEditor language="java" value={solutionModal.solution} onChange={val=>setSolutionModal(prev=>({...prev,solution:val||''}))} height="100%"/>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CodeforcesPage;
