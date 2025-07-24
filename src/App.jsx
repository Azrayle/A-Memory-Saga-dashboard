import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Eye, Heart, MessageCircle, Share2, Target, Calendar, BarChart3, Settings } from 'lucide-react';

// Sample data for the dashboard
const kpiData = [
  { name: 'Total Followers', current: 6800, target: 10000, change: 4.6, status: 'on-track' },
  { name: 'Engagement Rate', current: 4.3, target: 5.0, change: 10.3, status: 'on-track' },
  { name: 'Content Views', current: 48000, target: 50000, change: 14.3, status: 'excellent' },
  { name: 'Website Traffic', current: 500, target: 2000, change: 11.1, status: 'behind' },
  { name: 'Merch Conversions', current: 25, target: 100, change: 25.0, status: 'behind' }
];

const platformData = [
  { platform: 'YouTube', followers: 1250, engagement: 4.2, views: 15000, growth: 4.2, priority: 'High' },
  { platform: 'TikTok', followers: 2800, engagement: 6.8, views: 25000, growth: 7.7, priority: 'High' },
  { platform: 'Instagram', followers: 1800, engagement: 3.5, views: 8000, growth: 2.9, priority: 'Medium' },
  { platform: 'Facebook', followers: 950, engagement: 2.8, views: 3500, growth: 3.3, priority: 'Medium' }
];

const weeklyData = [
  { week: 'Week 1', YouTube: 12000, TikTok: 20000, Instagram: 7000, Facebook: 3000 },
  { week: 'Week 2', YouTube: 13500, TikTok: 22000, Instagram: 7500, Facebook: 3200 },
  { week: 'Week 3', YouTube: 14200, TikTok: 23500, Instagram: 7800, Facebook: 3300 },
  { week: 'Week 4', YouTube: 15000, TikTok: 25000, Instagram: 8000, Facebook: 3500 }
];

const contentTypes = [
  { name: 'Music Videos', value: 35, color: '#2D1B69' },
  { name: 'Behind-the-Scenes', value: 25, color: '#00D4FF' },
  { name: 'Character Spotlights', value: 20, color: '#FFD700' },
  { name: 'Community Discussion', value: 15, color: '#8B0000' },
  { name: 'Other', value: 5, color: '#C0C0C0' }
];

const upcomingContent = [
  { date: '2025-07-22', type: 'Tech Tuesday', platform: 'TikTok', title: 'AI Creation Process: Character Themes' },
  { date: '2025-07-23', type: 'Music Wednesday', platform: 'YouTube', title: 'Echoes of Tomorrow - Part 2 Release' },
  { date: '2025-07-24', type: 'Theory Thursday', platform: 'Facebook', title: 'Character Motivation Discussion' },
  { date: '2025-07-25', type: 'Feature Friday', platform: 'Instagram', title: 'Protagonist Character Spotlight' }
];

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'on-track': return 'bg-blue-500';
      case 'behind': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Rock Opera Campaign Dashboard</h1>
          <p className="text-purple-200">AI-Developed Music Marketing Analytics</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="platforms" className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
              <Users className="w-4 h-4 mr-2" />
              Platforms
            </TabsTrigger>
            <TabsTrigger value="content" className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
              <Calendar className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="goals" className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
              <Target className="w-4 h-4 mr-2" />
              Goals
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {kpiData.map((kpi, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-white">{kpi.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-2">
                      {kpi.name.includes('Rate') ? `${kpi.current}%` : kpi.current.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">+{kpi.change}%</span>
                    </div>
                    <Progress 
                      value={(kpi.current / kpi.target) * 100} 
                      className="mt-2 h-2"
                    />
                    <div className="text-xs text-purple-200 mt-1">
                      Target: {kpi.target.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Weekly Performance Trends</CardTitle>
                  <CardDescription className="text-purple-200">
                    Views across all platforms over the last 4 weeks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="week" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(45, 27, 105, 0.9)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Legend />
                      <Line type="monotone" dataKey="YouTube" stroke="#FFD700" strokeWidth={2} />
                      <Line type="monotone" dataKey="TikTok" stroke="#00D4FF" strokeWidth={2} />
                      <Line type="monotone" dataKey="Instagram" stroke="#E1306C" strokeWidth={2} />
                      <Line type="monotone" dataKey="Facebook" stroke="#1877F2" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Content Type Distribution</CardTitle>
                  <CardDescription className="text-purple-200">
                    Breakdown of content types by engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={contentTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contentTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(45, 27, 105, 0.9)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Platforms Tab */}
          <TabsContent value="platforms" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platformData.map((platform, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{platform.platform}</CardTitle>
                      <Badge className={getPriorityColor(platform.priority)}>
                        {platform.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-purple-300" />
                          <span className="text-sm text-purple-200">Followers</span>
                        </div>
                        <div className="text-xl font-bold text-white">{platform.followers.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-purple-300" />
                          <span className="text-sm text-purple-200">Engagement</span>
                        </div>
                        <div className="text-xl font-bold text-white">{platform.engagement}%</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-purple-300" />
                          <span className="text-sm text-purple-200">Weekly Views</span>
                        </div>
                        <div className="text-xl font-bold text-white">{platform.views.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-purple-300" />
                          <span className="text-sm text-purple-200">Growth Rate</span>
                        </div>
                        <div className="text-xl font-bold text-white">+{platform.growth}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Platform Performance Comparison</CardTitle>
                <CardDescription className="text-purple-200">
                  Follower count and engagement rates across platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="platform" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(45, 27, 105, 0.9)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="followers" fill="#FFD700" name="Followers" />
                    <Bar dataKey="engagement" fill="#00D4FF" name="Engagement Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Content Schedule</CardTitle>
                <CardDescription className="text-purple-200">
                  Next 4 days of planned content across all platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingContent.map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-purple-200">{content.date}</div>
                        <Badge variant="outline" className="text-white border-white/30">
                          {content.type}
                        </Badge>
                        <Badge className={getPriorityColor('Medium')}>
                          {content.platform}
                        </Badge>
                      </div>
                      <div className="text-white font-medium">{content.title}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Content Created</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">45</div>
                  <div className="text-sm text-purple-200">This month</div>
                  <Progress value={75} className="mt-2 h-2" />
                  <div className="text-xs text-purple-200 mt-1">Target: 60</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Avg. Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">4.3%</div>
                  <div className="text-sm text-purple-200">Across all content</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">+0.4% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Top Performer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-white mb-1">Character Reveal</div>
                  <div className="text-sm text-purple-200 mb-2">TikTok • 25K views</div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-white">8.2% engagement</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kpiData.map((goal, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">{goal.name}</CardTitle>
                    <CardDescription className="text-purple-200">
                      Monthly target progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">
                        {goal.name.includes('Rate') ? `${goal.current}%` : goal.current.toLocaleString()}
                      </span>
                      <Badge className={getStatusColor(goal.status) + ' text-white'}>
                        {goal.status === 'excellent' ? 'Excellent' : 
                         goal.status === 'on-track' ? 'On Track' : 'Behind'}
                      </Badge>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                    <div className="flex justify-between text-sm text-purple-200">
                      <span>Current: {goal.current.toLocaleString()}</span>
                      <span>Target: {goal.target.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">+{goal.change}% this week</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Goal Achievement Timeline</CardTitle>
                <CardDescription className="text-purple-200">
                  Projected timeline to reach annual targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white">10K Total Followers</span>
                    <span className="text-green-400">Est. 2 months</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white">5% Avg Engagement Rate</span>
                    <span className="text-green-400">Est. 1 month</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white">2K Monthly Website Traffic</span>
                    <span className="text-yellow-400">Est. 4 months</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-white">100 Monthly Merch Sales</span>
                    <span className="text-yellow-400">Est. 3 months</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;

