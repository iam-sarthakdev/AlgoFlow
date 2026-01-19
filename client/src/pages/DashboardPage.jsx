import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Plus,
    Calendar,
    TrendingUp,
    CheckCircle,
    Clock,
    ArrowRight,
    Code2,
    Activity
} from 'lucide-react';
import { fetchReminders, fetchAnalytics } from '../services/api';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Cell,
    LineChart,
    Line
} from 'recharts';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [reminders, setReminders] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [remindersData, analyticsData] = await Promise.all([
                fetchReminders(),
                fetchAnalytics()
            ]);
            setReminders(Array.isArray(remindersData) ? remindersData : (remindersData.reminders || []));
            setAnalytics(analyticsData);
        } catch (error) {
            console.error('Failed to load dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate weekly activity
    const getWeeklyActivity = () => {
        if (!analytics?.all_revisions) return [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            date.setDate(date.getDate() - (6 - i));
            return {
                day: days[date.getDay()],
                date: date.toISOString().split('T')[0],
                count: 0
            };
        });

        analytics.all_revisions.forEach(rev => {
            const revDate = new Date(rev.revised_at).toISOString().split('T')[0];
            const dayData = last7Days.find(d => d.date === revDate);
            if (dayData) dayData.count++;
        });

        return last7Days;
    };

    const weeklyData = getWeeklyActivity();
    const upcomingReminders = (reminders || []).filter(r => r.status === 'pending').slice(0, 3);
    const overdueCount = (reminders || []).filter(r => r.status === 'overdue').length;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Code2 size={20} className="text-violet-500" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 lg:p-10 max-w-[1600px] mx-auto pb-32">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg shadow-lg shadow-violet-500/20">
                        <Activity className="text-white" size={24} />
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">Dashboard.</h1>
                </div>
                <p className="text-slate-400 text-lg">Your automated coding growth engine.</p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                {/* Total Problems */}
                <motion.div variants={itemVariants} onClick={() => navigate('/problems')} className="group cursor-pointer">
                    <div className="glass-card p-6 h-full relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Code2 size={80} className="text-violet-500" />
                        </div>
                        <div className="flex flex-col justify-between h-full relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                                <Code2 className="text-violet-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
                                    {analytics?.total_problems || 0}
                                </h3>
                                <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">Total Problems</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                </motion.div>

                {/* Problems Solved */}
                <motion.div variants={itemVariants} onClick={() => navigate('/problems')} className="group cursor-pointer">
                    <div className="glass-card p-6 h-full relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CheckCircle size={80} className="text-emerald-500" />
                        </div>
                        <div className="flex flex-col justify-between h-full relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                                <CheckCircle className="text-emerald-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                                    {analytics?.total_solved || 0}
                                </h3>
                                <p className="text-emerald-400/80 font-bold text-sm uppercase tracking-wider">Solved</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                </motion.div>

                {/* Streak */}
                <motion.div variants={itemVariants} className="group cursor-pointer">
                    <div className="glass-card p-6 h-full relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp size={80} className="text-amber-500" />
                        </div>
                        <div className="flex flex-col justify-between h-full relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                                <TrendingUp className="text-amber-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors py-0.5">
                                    {analytics?.revision_streak || 0}<span className="text-lg text-slate-500 font-normal ml-2">days</span>
                                </h3>
                                <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">Current Streak</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                </motion.div>

                {/* Reminders */}
                <motion.div variants={itemVariants} className="group cursor-pointer">
                    <div className="glass-card p-6 h-full relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Clock size={80} className="text-rose-500" />
                        </div>
                        <div className="flex flex-col justify-between h-full relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-4 group-hover:bg-rose-500/20 transition-colors">
                                <Clock className="text-rose-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold text-white mb-1 group-hover:text-rose-300 transition-colors">
                                    {reminders?.length || 0}
                                </h3>
                                <p className="text-rose-400/80 font-bold text-sm uppercase tracking-wider">Active Reminders</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Weekly Activity Chart */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="glass-card p-8 border border-white/5 bg-gradient-to-b from-white/5 to-transparent"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Weekly Activity</h3>
                            <p className="text-sm text-slate-400">Problems revised over the last 7 days</p>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                            <Calendar size={18} className="text-slate-300" />
                        </div>
                    </div>

                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="day"
                                    stroke="rgba(255,255,255,0.2)"
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="rgba(255,255,255,0.2)"
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{
                                        backgroundColor: '#1C1C1E',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                        color: '#fff'
                                    }}
                                />
                                <Bar
                                    dataKey="count"
                                    radius={[6, 6, 0, 0]}
                                    fill="url(#barGradient)"
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Upcoming Reminders */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="glass-card p-8 border border-white/5 relative overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Upcoming Reminders</h3>
                            <p className="text-sm text-slate-400">Don't break your streak</p>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                            <Clock size={18} className="text-slate-300" />
                        </div>
                    </div>

                    {upcomingReminders.length > 0 ? (
                        <div className="space-y-4 relative z-10">
                            {upcomingReminders.map((reminder, index) => (
                                <motion.div
                                    key={reminder.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    onClick={() => navigate(`/problems/${reminder.id}`)}
                                    className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 rounded-xl cursor-pointer transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Calendar size={16} className="text-violet-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white group-hover:text-violet-200 transition-colors">{reminder.title}</h4>
                                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                                By {new Date(reminder.next_reminder_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                        <ArrowRight size={14} className="text-white" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-[250px] flex flex-col items-center justify-center text-white/30 relative z-10">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <p className="font-medium">You're all caught up!</p>
                            <p className="text-sm mt-2 max-w-[200px] text-center opacity-60">No pending revisions for the next 24 hours.</p>
                        </div>
                    )}

                    {upcomingReminders.length > 0 && (
                        <button
                            onClick={() => navigate('/problems')}
                            className="w-full mt-6 py-3 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 hover:border-white/20"
                        >
                            View All Reminders
                        </button>
                    )}
                </motion.div>
            </div>

            {/* Floating Action Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                onClick={() => navigate('/problems/new')}
                className="fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full shadow-[0_8px_30px_rgb(99,102,241,0.4)] flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all duration-300 z-50 group hover:shadow-[0_8px_40px_rgb(99,102,241,0.6)]"
            >
                <Plus size={32} className="text-white" />
                <span className="absolute right-24 bg-white/10 backdrop-blur-md text-white font-medium px-4 py-2 rounded-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap border border-white/10 pointer-events-none">
                    Add New Problem
                </span>
            </motion.button>
        </div>
    );
};

export default DashboardPage;
