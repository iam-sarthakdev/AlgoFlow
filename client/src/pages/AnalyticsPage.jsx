import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    CartesianGrid
} from 'recharts';
import {
    TrendingUp,
    Target,
    Award,
    Flame,
    Zap,
    Calendar,
    Activity,
    Hash,
    Trophy,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchAnalytics } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AnalyticsPage = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const data = await fetchAnalytics();
            // Simulate some mock data for charts if backend data is sparse for demo
            setAnalytics(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner message="Analyzing performance..." />;
    if (!analytics) return <div className="text-center text-white/60 p-10">No analytics data available</div>;

    // Data Processing
    const difficultyData = Object.entries(analytics.by_difficulty).map(([key, value]) => ({
        name: key,
        value,
        color: key === 'Easy' ? '#10b981' : key === 'Medium' ? '#f59e0b' : '#ef4444'
    }));

    const topicData = Object.entries(analytics.by_topic)
        .sort((a, b) => b[1] - a[1]) // Sort by count
        .slice(0, 6) // Top 6 topics
        .map(([key, value]) => ({
            name: key,
            value
        }));

    // Generate mock activity data if none exists (usually backend should provide this)
    const activityData = [
        { name: 'Mon', problems: 4, revisions: 2 },
        { name: 'Tue', problems: 3, revisions: 5 },
        { name: 'Wed', problems: 7, revisions: 1 },
        { name: 'Thu', problems: 5, revisions: 6 },
        { name: 'Fri', problems: 2, revisions: 3 },
        { name: 'Sat', problems: 8, revisions: 4 },
        { name: 'Sun', problems: 6, revisions: 7 },
    ];

    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

    return (
        <div className="min-h-screen p-6 lg:p-10 max-w-[1600px] mx-auto pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 flex items-center justify-between"
            >
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20">
                            <Activity className="text-white" size={24} />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                            Performance Analytics
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg">Deep dive into your coding journey and preparation stats.</p>
                </div>

                {/* Streak Badge */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="hidden md:flex flex-col items-center bg-gradient-to-b from-[#1a1a1c] to-[#0a0a0b] border border-orange-500/30 p-4 rounded-2xl shadow-xl shadow-orange-500/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
                    <div className="flex items-center gap-2 mb-1">
                        <Flame className="text-orange-500 animate-pulse" fill="#f97316" size={20} />
                        <span className="text-orange-200 font-bold uppercase text-xs tracking-wider">Current Streak</span>
                    </div>
                    <div className="text-3xl font-black text-white">
                        {analytics.revision_streak} <span className="text-sm font-medium text-white/40">DAYS</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Problems', value: analytics.total_problems, icon: Hash, color: 'blue', sub: 'Indexed' },
                    { label: 'Problems Solved', value: analytics.total_problems, icon: CheckCircle2, color: 'emerald', sub: 'Completed' }, // Assuming total_problems = solved for now
                    { label: 'Total Revisions', value: analytics.total_revisions || 0, icon: TrendingUp, color: 'purple', sub: 'Sessions' },
                    { label: 'Completion', value: '0%', icon: Trophy, color: 'amber', sub: 'Of Goal' }, // Placeholder
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                    >
                        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${stat.color}-500/10 rounded-full blur-2xl group-hover:bg-${stat.color}-500/20 transition-colors`} />
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-white/40 border border-white/5`}>
                                {stat.sub}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-1 group-hover:scale-105 transition-transform origin-left">
                                {stat.value}
                            </h3>
                            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* Activity Graph */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-8 glass-card p-6 border border-white/5"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Activity size={20} className="text-indigo-400" />
                                Preparation Activity
                            </h3>
                            <p className="text-sm text-slate-500">Problems solved vs Revisions over the last week</p>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRevisions" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                                    itemStyle={{ color: '#e2e8f0' }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="problems" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorProblems)" name="Problems Solved" />
                                <Area type="monotone" dataKey="revisions" stroke="#34d399" strokeWidth={3} fillOpacity={1} fill="url(#colorRevisions)" name="Revisions" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Difficulty Distribution */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-4 glass-card p-6 border border-white/5 flex flex-col"
                >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Target size={20} className="text-rose-400" />
                        Difficulty Breakdown
                    </h3>
                    <div className="flex-1 min-h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={difficultyData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {difficultyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend verticalAlign="bottom" height={36} content={({ payload }) => (
                                    <div className="flex justify-center gap-4 text-xs font-medium text-slate-400 mt-4">
                                        {payload.map((entry, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                                {entry.value}
                                            </div>
                                        ))}
                                    </div>
                                )} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-12">
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-white">{analytics.total_problems}</span>
                                <span className="text-xs text-slate-500 uppercase tracking-widest">Total</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Topic Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-12 glass-card p-6 border border-white/5"
                >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Hash size={20} className="text-purple-400" />
                        Top Problem Topics
                    </h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topicData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#ffffff05' }}
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {topicData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Most Revised List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="lg:col-span-12 glass-card p-6 border border-white/5"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <TrendingUp size={20} className="text-emerald-400" />
                            Most Revised Problems
                        </h3>
                    </div>

                    {analytics.most_revised.length === 0 ? (
                        <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
                            <TrendingUp className="mx-auto h-12 w-12 text-slate-600 mb-3" />
                            <p className="text-slate-400">Not enough data yet. Start revising!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {analytics.most_revised.map((problem, index) => (
                                <motion.div
                                    key={problem.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/5 hover:border-white/10 hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
                                            ${index === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                index === 1 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/30' :
                                                    index === 2 ? 'bg-orange-700/20 text-orange-400 border border-orange-700/30' :
                                                        'bg-white/5 text-slate-500'}
                                        `}>
                                            {index + 1}
                                        </div>
                                        <span className="font-medium text-white truncate max-w-[150px]">{problem.title}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-md text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                        <TrendingUp size={12} />
                                        {problem.revision_count}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
