"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Briefcase, Activity } from "lucide-react";

export default function DashboardPage() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalSkills, setTotalSkills] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await fetch("/api/projects");
        const projectsData = await projectsRes.json();

        const skillsRes = await fetch("/api/skills");
        const skillsData = await skillsRes.json();

        // If the endpoints return arrays
        setTotalProjects(projectsData.length);
        setTotalSkills(skillsData.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
      >
        Welcome to Your Dashboard
      </motion.h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={totalProjects}
          icon={<Briefcase className="h-6 w-6 text-white" />}
          color="bg-indigo-500"
        />
        <StatCard
          title="Total Skills"
          value={totalSkills}
          icon={<BarChart className="h-6 w-6 text-white" />}
          color="bg-emerald-500"
        />
      </div>

      {/* Recent activity */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <ActivityCard
            title="New project"
            description="E-Commerce Platform added"
            timestamp="1 hour ago"
            color="bg-blue-600"
          />
          <ActivityCard
            title="Profile updated"
            description="About Me section edited"
            timestamp="2 hours ago"
            color="bg-green-600"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 shadow rounded-2xl p-6 flex items-center justify-between"
    >
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
      <div className={`${color} rounded-xl p-3`}>{icon}</div>
    </motion.div>
  );
}

function ActivityCard({
  title,
  description,
  timestamp,
  color,
}: {
  title: string;
  description: string;
  timestamp: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow flex items-start gap-4"
    >
      <div
        className={`${color} rounded-full h-10 w-10 flex items-center justify-center`}
      >
        <Activity className="text-white w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-gray-800 dark:text-white font-medium">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="text-sm text-gray-400 whitespace-nowrap">{timestamp}</div>
    </motion.div>
  );
}
