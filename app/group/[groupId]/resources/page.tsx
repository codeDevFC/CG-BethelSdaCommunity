"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { 
  ArrowLeft, BookOpen, Users, Heart, Shield, 
  ChevronDown, ChevronUp, Target, Clock, 
  FileText, Lightbulb, CheckCircle, AlertTriangle,
  Bell, Home, Utensils, Car, Lock, Briefcase,
  ClipboardCheck, Sparkles, MessageCircle, Music,
  Coffee, Calendar, Star, Award, Flame, Cross,
  Library, Download, Search, Crown, 
  Scroll, Compass, Anchor, Sun, Droplet,
  TreePine, Leaf, Fish, Bird, Flower2,
  BookMarked, BookText, Bible as BibleIcon
} from "lucide-react";

// Use BookMarked as replacement for Bible
const BibleIconComponent = BookMarked;

// Collapsible Section Component
function CollapsibleSection({ 
  title, 
  icon: Icon, 
  children, 
  defaultOpen = false,
  color = "from-teal-600 to-emerald-600",
  badge
}: { 
  title: string; 
  icon: any; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  color?: string;
  badge?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-white shadow-md`}>
            <Icon size={20} />
          </div>
          <div>
            <h2 className="font-black text-lg text-gray-800">{title}</h2>
            {badge && <p className="text-[10px] text-gray-500">{badge}</p>}
          </div>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      
      {isOpen && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

// Quick Tips Component
function QuickTipsSection() {
  const tips = [
    { icon: Users, title: "Greet at the Door", description: "Assign a door greeter to welcome each person warmly. First impressions matter and set the tone for the entire meeting." },
    { icon: Coffee, title: "Relaxed Environment", description: "Food and icebreaker questions help people relax. Purpose is to 'break the ice' and reduce awkwardness, making interaction easier." },
    { icon: Heart, title: "Your Presence is Powerful", description: "Your authenticity and transformed life expressed through care adds warmth and meaning to their lives." },
    { icon: BookOpen, title: "Make Bible Study Relevant", description: "Begin with Jesus' teachings in the Gospels or His parables. Draw out useful lessons for daily life. Keep study short, clear, and engaging." },
    { icon: MessageCircle, title: "The 3 Ps of Prayer", description: "Project (application of Word), Praise (thanksgiving), Prayer (specific requests). This structure keeps prayer focused and meaningful." },
    { icon: Music, title: "Song Service", description: "Choose 2 hymns or choruses. Connect songs with personal stories to make worship meaningful and relational." },
    { icon: Utensils, title: "Food and Fellowship", description: "Involve everyone in preparation. Treat seekers as family, not guests. Shared meals build belonging and community." },
    { icon: Target, title: "Stay on Track", description: "Keep study to 15-20 minutes. Avoid long-winded monologues. Let the Word speak and guide discussion naturally." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tips.map((tip, idx) => (
        <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-teal-50 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
            <tip.icon size={14} className="text-teal-600" />
          </div>
          <div>
            <h3 className="font-black text-sm text-gray-800">{tip.title}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{tip.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Session Format Component
function SessionFormatSection() {
  const format = [
    { time: "5-10 min", activity: "Welcome & Fellowship", description: "Greet members, share food/refreshments, casual conversation" },
    { time: "10-15 min", activity: "Icebreaker Question", description: "Get everyone talking with a light, engaging question" },
    { time: "5 min", activity: "Opening Prayer & Song", description: "Brief prayer, 1-2 songs/choruses to center hearts on God" },
    { time: "20-25 min", activity: "Bible Study", description: "Read passage, discuss 2-3 main points, draw life applications" },
    { time: "10 min", activity: "Prayer Time (3 Ps)", description: "Project (application), Praise (thanksgiving), Prayer (requests)" },
    { time: "5-10 min", activity: "Announcements & Closing", description: "Share upcoming events, close with prayer" }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 mb-4">
        <h3 className="font-black text-teal-800 text-sm mb-2">📋 Suggested 90-Minute Session Structure</h3>
        <p className="text-xs text-teal-700">Adjust timing based on your group's needs and culture</p>
      </div>
      <div className="space-y-2">
        {format.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-16 shrink-0">
              <span className="text-[10px] font-black text-teal-600 bg-teal-100 px-2 py-1 rounded-full">{item.time}</span>
            </div>
            <div className="flex-1">
              <p className="font-black text-sm text-gray-800">{item.activity}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 rounded-xl p-3 mt-3">
        <p className="text-[10px] text-amber-700 flex items-center gap-1">
          <Lightbulb size={12} /> Pro Tip: Consistency is key! Members appreciate knowing what to expect each week.
        </p>
      </div>
    </div>
  );
}

// ==================== BIBLE STUDY THEMES - FULL CONTENT ====================

// Theme 1: The Meaning of Faith
function FaithTheme() {
  const lessons = [
    { title: "Definition of Faith", references: "Matt 8:5-13; Luke 7:1-10", description: "The faith of the centurion - understanding what true faith looks like." },
    { title: "What Faith is Not", references: "Matt 8:23-27; Mark 4:36-41; Luke 8:22-25", description: "Little faith - calming the storm. Also Jesus walks on water (Matt 14:23-33)." },
    { title: "Saved by Faith", references: "Matt 9:20-22; Mark 5:25-34; Luke 8:43-48", description: "Healing of the woman with bleeding - 'your faith has healed you.'" },
    { title: "Faith Expressed through Action", references: "Matt 9:1-2; Mark 2:1-5; Luke 5:17-21", description: "Healing of the paralytic - 'Jesus saw their faith.'" },
    { title: "Growing Faith", references: "Matt 17:14-21; Mark 9:14-27; Luke 17:5-6", description: "Healing of a demon-possessed boy - 'help my unbelief.'" },
    { title: "Great Faith", references: "Matt 15:21-28; Mark 7:24-30", description: "Faith of the Canaanite woman - 'you have great faith.'" },
    { title: "Faith of Jesus", references: "Matt 27:32-54", description: "The crucifixion - Jesus' ultimate act of faith." }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-blue-50 rounded-xl p-3 mb-2">
        <p className="text-xs text-blue-700">Throughout Jesus' ministry, He wanted to teach His disciples what faith is all about. There are great blessings for those who apply these principles.</p>
      </div>
      {lessons.map((lesson, idx) => (
        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-black text-sm text-gray-800">{lesson.title}</h4>
          <p className="text-[10px] font-mono text-teal-600 mt-0.5">{lesson.references}</p>
          <p className="text-xs text-gray-500 mt-1">{lesson.description}</p>
        </div>
      ))}
    </div>
  );
}

// Theme 2: Jesus - The Source of Life (NEWSTART)
function JesusSourceOfLifeTheme() {
  const elements = [
    { element: "Food / Bread", reference: "John 6:25-41", title: "Jesus - Bread of Life", application: "Eat a balanced diet" },
    { element: "Water", reference: "John 4:1-14", title: "Jesus - Living Water", application: "6-8 glasses of water daily" },
    { element: "Sunlight / Light", reference: "John 9:1-5, 35-41; John 1:1-9", title: "Jesus - Light of the World", application: "15-20 mins morning sunlight" },
    { element: "Temperance", reference: "Matt 4:1-11", title: "Jesus - The Overcomer", application: "Moderation in all things" },
    { element: "Air / Breath", reference: "John 20:19-23", title: "Jesus - Breath of Life", application: "Fresh air daily" },
    { element: "Rest", reference: "Matt 11:28-30", title: "Jesus - The Restorer", application: "8 hours sleep; prayer before bed" },
    { element: "Trust", reference: "John 14:5-14", title: "Jesus - Way, Truth & Life", application: "Daily trust in God" },
    { element: "Exercise", reference: "Matt 25:14-29", title: "Jesus - Lord of Talents", application: "20 mins exercise daily" }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-green-50 rounded-xl p-3 mb-2">
        <p className="text-xs text-green-700">This series points to Jesus who provides ALL the important elements that sustain life. By explaining physical elements, help members relate to spiritual things.</p>
        <p className="text-[10px] text-green-600 mt-1">Suggested format: 5-7 min INTRO (health element) → 15-20 min CONTENT (3 main points) → 5 min APPLICATION</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {elements.map((item, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              {item.element === "Food / Bread" && <Sun size={12} className="text-amber-600" />}
              {item.element === "Water" && <Droplet size={12} className="text-blue-600" />}
              {item.element === "Sunlight / Light" && <Sun size={12} className="text-yellow-600" />}
              <h4 className="font-black text-sm text-gray-800">{item.element}</h4>
            </div>
            <p className="text-[10px] font-mono text-teal-600">{item.reference}</p>
            <p className="text-xs font-bold text-gray-700">{item.title}</p>
            <p className="text-[10px] text-gray-500 mt-1">💡 {item.application}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Theme 3: The Life of Mary of Bethany
function MaryOfBethanyTheme() {
  const studies = [
    { title: "Adultery in the Temple", reference: "John 8:2-11", themes: "Judgement, True repentance" },
    { title: "Praying for the Dead", reference: "John 11:1-43", themes: "State of the dead" },
    { title: "Martha's Distractions", reference: "Luke 10:38-42", themes: "Morning devotion, Service for God" },
    { title: "Simon's Feast", reference: "Matt 26:6-13; Mark 14:3-9; John 12:1-8", themes: "Total surrender, Total sacrifice" },
    { title: "At the Cross", reference: "Matt 27:35-56; Mark 15:25-41; Luke 23:32-49; John 19:18-37", themes: "The power of the cross" },
    { title: "At the Tomb", reference: "Matt 27:57-61; Mark 15:42-47; Luke 24:50-56; John 19:38-42", themes: "Sabbath, Dead in sin, Plan of salvation" },
    { title: "The Resurrection", reference: "Matt 28:1-7; Mark 16:1-8; Luke 24:1-12; John 20:1-18", themes: "Witnessing, Summary of the study" }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-purple-50 rounded-xl p-3 mb-2">
        <p className="text-xs text-purple-700">Mary's life demonstrates the conversion journey of a person who was once broken, yet touched by Christ's love, responded with great love, tenacious loyalty, and perfect devotion.</p>
      </div>
      {studies.map((study, idx) => (
        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-black text-sm text-gray-800">{study.title}</h4>
          <p className="text-[10px] font-mono text-teal-600">{study.reference}</p>
          <p className="text-xs text-gray-500 mt-1">🎯 Themes: {study.themes}</p>
        </div>
      ))}
    </div>
  );
}

// Theme 4: Miracles of Jesus
function MiraclesTheme() {
  const miracles = [
    { title: "Turning Water into Wine", reference: "John 2:1-11", lesson: "Jesus transforms the ordinary into extraordinary" },
    { title: "Healing the Leper", reference: "Matt 8:2-4; Mark 1:40-44; Luke 5:12-14", lesson: "Jesus is willing to make us clean" },
    { title: "Healing the Paralytic", reference: "Matt 9:2-8; Mark 2:1-12; Luke 5:18-26", lesson: "Faith of friends brings healing" },
    { title: "Healing a Demon-Possessed Man", reference: "Matt 8:28-34; Mark 5:1-20; Luke 8:26-39", lesson: "Jesus has power over evil" },
    { title: "Healing the Hemophilic Woman", reference: "Matt 9:18-36; Mark 5:21-48; Luke 8:40-56", lesson: "Touch of faith brings healing" },
    { title: "Feeding the 5,000", reference: "Matt 14:13-21; Mark 6:32-44; Luke 9:10-17; John 6:1-13", lesson: "Jesus provides abundantly" },
    { title: "Walking on Water", reference: "Matt 14:22-34; Mark 6:45-52; John 6:14-21", lesson: "Keep your eyes on Jesus" },
    { title: "Healing the Blind Man", reference: "John 9", lesson: "Jesus opens our spiritual eyes" },
    { title: "Resurrection of Lazarus", reference: "Luke 10:38-42; John 11:1-44", lesson: "Jesus is the resurrection and the life" }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-amber-50 rounded-xl p-3 mb-2">
        <p className="text-xs text-amber-700">Through each miracle Jesus performed, He had a deeper spiritual lesson to teach - healing the blind (spiritual blindness), demon-possessed (slave to sin), etc.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {miracles.map((miracle, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-black text-sm text-gray-800">{miracle.title}</h4>
            <p className="text-[10px] font-mono text-teal-600">{miracle.reference}</p>
            <p className="text-xs text-gray-500 mt-1">✨ {miracle.lesson}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Theme 5: Parables of Jesus - Part 1
function ParablesPartOneTheme() {
  const parables = [
    { title: "The Parable of the Sower", reference: "Matt 13:1-9, 18-23; Mark 4:1-20; Luke 8:4-15", lesson: "Different responses to God's Word" },
    { title: "The Mustard Seed & Yeast", reference: "Matt 13:31-33; Mark 4:30-32; Luke 13:18-21", lesson: "The Kingdom of God starts small but grows greatly" },
    { title: "Hidden Treasure", reference: "Matt 13:44", lesson: "The Kingdom of God is worth everything" },
    { title: "Two Worshipers (Pharisee & Tax Collector)", reference: "Luke 18:9-14", lesson: "Humility vs self-righteousness" },
    { title: "The Lost Sheep & Lost Coin", reference: "Matt 18:12-14; Luke 15:1-10", lesson: "God's heart for the lost" }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-indigo-50 rounded-xl p-3 mb-2">
        <p className="text-xs text-indigo-700">These 'stories that Jesus told' help us better understand who Jesus is and what He teaches.</p>
      </div>
      {parables.map((parable, idx) => (
        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-black text-sm text-gray-800">{parable.title}</h4>
          <p className="text-[10px] font-mono text-teal-600">{parable.reference}</p>
          <p className="text-xs text-gray-500 mt-1">📖 {parable.lesson}</p>
        </div>
      ))}
    </div>
  );
}

// Theme 6: Parables of Jesus - Part 2
function ParablesPartTwoTheme() {
  const parables = [
    { title: "The Unmerciful Servant", reference: "Matt 18:21-35", lesson: "Forgive as you have been forgiven" },
    { title: "The Two Sons", reference: "Matt 21:23-32", lesson: "Words must be accompanied by deeds" },
    { title: "The Rich Fool", reference: "Luke 12:13-24", lesson: "Life is not about possessions" },
    { title: "The Good Samaritan", reference: "Luke 10:25-37", lesson: "Love your neighbor as yourself" },
    { title: "The Rich Man and Lazarus", reference: "Luke 16:19-31", lesson: "Our choices determine our destiny" },
    { title: "The Workers in the Vineyard", reference: "Matt 19:16-20:16; Mark 10:17-31; Luke 18:18-30", lesson: "God's grace is for all" },
    { title: "The Growing Seed", reference: "Mark 4:26-29", lesson: "Spiritual growth is a process" },
    { title: "The Weeds", reference: "Matt 13:24-30, 36-43", lesson: "Leave judgment to God" },
    { title: "The Lost Son (Prodigal)", reference: "Luke 15:11-32", lesson: "God's love for the wayward" },
    { title: "The Great Banquet", reference: "Luke 14:1, 12-24", lesson: "God's invitation is for all" },
    { title: "The Tenants", reference: "Matt 21:33-44; Mark 12:1-12; Luke 20:9-19", lesson: "Faithfulness to God" },
    { title: "The Wedding Banquet", reference: "Matt 22:1-14", lesson: "Need righteousness of Christ" },
    { title: "The Ten Virgins", reference: "Matt 25:1-13", lesson: "Be ready for Christ's return" }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-indigo-50 rounded-xl p-3 mb-2">
        <p className="text-xs text-indigo-700">Second series - deeper parables for believers and long-term seekers.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {parables.map((parable, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-black text-sm text-gray-800">{parable.title}</h4>
            <p className="text-[10px] font-mono text-teal-600">{parable.reference}</p>
            <p className="text-xs text-gray-500 mt-1">📖 {parable.lesson}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Theme 7: Last Week of Jesus' Life
function LastWeekTheme() {
  const studies = [
    { title: "Simon's Feast", reference: "Matt 26:6-13; Mark 14:3-9; Luke 7:36-50; John 12:1-19", desc: "Mary anoints Jesus - an act of extravagant love" },
    { title: "Symbol of Humility and Communion", reference: "Matt 26:26-29; Mark 14:17-18, 22-25; Luke 22:14-20; John 13:1-20", desc: "The Last Supper and foot washing" },
    { title: "Promise of the Second Coming", reference: "John 13:31-14:31", desc: "Jesus comforts His disciples" },
    { title: "Gethsemane: Plan of Salvation", reference: "Matt 26:36-45; Mark 14:32-52; Luke 22:40-53; John 18:1-12", desc: "Jesus' agony in the garden" },
    { title: "Jesus Under Trial", reference: "Matt 26:57-27:14; Mark 14:53-15:5; Luke 22:54-23:5; John 18:13-38", desc: "The illegal trials of Jesus" },
    { title: "Judas", reference: "Matt 26:1-5, 14-16, 21-25; Matt 27:3-10", desc: "The betrayal" },
    { title: "Death of Jesus", reference: "Matt 27:31-56; Mark 15:20-41; Luke 23:26-49; John 19:17-37", desc: "The crucifixion" },
    { title: "Resurrection of Jesus", reference: "Matt 28:2-4, 11-15", desc: "He is risen!" },
    { title: "Resurrected Christ", reference: "Luke 24:13-48; John 20:19-29", desc: "Post-resurrection appearances" }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-red-50 rounded-xl p-3 mb-2">
        <p className="text-xs text-red-700">A powerful study series to understand the life mission of Jesus, especially His final week on earth to save mankind.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {studies.map((study, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-black text-sm text-gray-800">{study.title}</h4>
            <p className="text-[10px] font-mono text-teal-600">{study.reference}</p>
            <p className="text-xs text-gray-500 mt-1">{study.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Theme 8: Come Alive - 7 Lessons for New Believers
function ComeAliveTheme() {
  const lessons = [
    { title: "Being Born", desc: "Experiencing the energy and vitality of a new kind of birth" },
    { title: "You've Been Born Again", desc: "Dealing with the realities of your new life in Christ" },
    { title: "You've Got to Eat to Grow", desc: "Focusing on the essential qualities of reading and studying the Bible" },
    { title: "You'll Learn to Talk", desc: "Learning how prayer can become important in your new relationship with Christ" },
    { title: "But How Can You Tell?", desc: "Discovering the dynamic qualities of the fruits of the Spirit" },
    { title: "Get Your Exercise!", desc: "Finding out how easily witnessing can work for you" },
    { title: "You'll Need Friends", desc: "Experiencing the tremendous benefits of fellowshipping with other Christians" }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-pink-50 rounded-xl p-3 mb-2">
        <p className="text-xs text-pink-700">Seven encouraging lessons in dynamic Christian living for new believers or those exploring faith.</p>
      </div>
      {lessons.map((lesson, idx) => (
        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-black text-sm text-gray-800">{lesson.title}</h4>
          <p className="text-xs text-gray-500 mt-1">{lesson.desc}</p>
        </div>
      ))}
    </div>
  );
}

// Theme 9: The Life of Daniel
function DanielTheme() {
  const studies = [
    { title: "Babylonian Captivity", reference: "Daniel 1", themes: "Faithfulness, Conviction, Diet" },
    { title: "Nebuchadnezzar's Dream of the Great Image", reference: "Daniel 2", themes: "God's control over history, Prophecy" },
    { title: "The Fiery Furnace - A Test of Allegiance", reference: "Daniel 3", themes: "Faithfulness unto death, God's protection" },
    { title: "The Conversion of Nebuchadnezzar", reference: "Daniel 4", themes: "Pride, Humility, God's sovereignty" },
    { title: "The Fall of Babylon", reference: "Daniel 5", themes: "The writing on the wall, Judgment" },
    { title: "Daniel in the Lion's Den", reference: "Daniel 6", themes: "Faithfulness in prayer, God's deliverance" }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-blue-50 rounded-xl p-3 mb-2">
        <p className="text-xs text-blue-700">The life of Daniel demonstrates obedience, faithfulness unto death, humility, and submissive prayer - characters to be possessed by God's people at the end time.</p>
      </div>
      {studies.map((study, idx) => (
        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-black text-sm text-gray-800">{study.title}</h4>
          <p className="text-[10px] font-mono text-teal-600">{study.reference}</p>
          <p className="text-xs text-gray-500 mt-1">🎯 {study.themes}</p>
        </div>
      ))}
    </div>
  );
}

// Theme 10: The Life of David
function DavidTheme() {
  const studies = [
    { title: "The Anointing of David", reference: "1 Sam 16:1-13", themes: "God looks at the heart" },
    { title: "David & Goliath", reference: "1 Sam 16:14-23; ch 17", themes: "Faith in God, not in self" },
    { title: "David Fleeing from Saul", reference: "1 Sam 18-22", themes: "Patience, Trusting God's timing" },
    { title: "The Magnanimity of David", reference: "1 Sam 22:20-23; ch 23-27", themes: "Forgiveness, Respect for authority" },
    { title: "The Downfall of Saul", reference: "1 Sam 28, 31", themes: "The consequences of disobedience" },
    { title: "David Came to the Throne", reference: "2 Sam 2-5:5", themes: "God's promises fulfilled" },
    { title: "The Reign of David", reference: "2 Sam 5:6-25; ch 6-7, 9-10", themes: "Leadership, Worship" },
    { title: "David's Sin & Repentance", reference: "2 Sam 11-12; Ps 51", themes: "True repentance, God's forgiveness" },
    { title: "The Last Years of David", reference: "2 Sam 24; 1 Kings 1; 1 Chron 21", themes: "Legacy, Final instructions" }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-amber-50 rounded-xl p-3 mb-2">
        <p className="text-xs text-amber-700">David was anointed king early, yet waited patiently for years. Difficult circumstances refined, taught, and prepared him for future responsibility - a man after God's own heart!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {studies.map((study, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-black text-sm text-gray-800">{study.title}</h4>
            <p className="text-[10px] font-mono text-teal-600">{study.reference}</p>
            <p className="text-xs text-gray-500 mt-1">🎯 {study.themes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Theme 11: The Life of Joseph
function JosephTheme() {
  const studies = [
    { title: "Joseph and His Family", reference: "Genesis 37", themes: "Jealousy, Anger, Fear" },
    { title: "Joseph as Slave in Egypt", reference: "Genesis 39", themes: "Overcoming temptation, Stewardship, Faithfulness in small things" },
    { title: "Joseph and the Prisoners' Dreams", reference: "Genesis 40", themes: "Trusting God when mistreated, disappointed, abandoned" },
    { title: "Joseph and Pharaoh's Dreams", reference: "Genesis 41", themes: "Standing before authorities, Humility when promoted" },
    { title: "Joseph and His Brothers", reference: "Genesis 42", themes: "Forgiveness, Learning to trust again" },
    { title: "Joseph's Cup and Benjamin", reference: "Genesis 43-44", themes: "Patience, Wisdom" },
    { title: "Joseph Revealed to His Brothers", reference: "Genesis 45", themes: "God's grace, Reconciliation" },
    { title: "Joseph and Family Reunion", reference: "Genesis 46:1-7, 28-47:12", themes: "Humility, Forgiveness" },
    { title: "Joseph and His Work Place", reference: "Genesis 47; 50:1-8", themes: "Integrity at work" },
    { title: "Joseph and His Final Years", reference: "Genesis 50:22-26", themes: "Leaving a legacy" }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-teal-50 rounded-xl p-3 mb-2">
        <p className="text-xs text-teal-700">The life of Joseph is an anti-type of Jesus - the Saviour and deliverer for His people. His character of faith in all circumstances, humility, diligence, and forgiveness serves as an example to us all.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {studies.map((study, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-black text-sm text-gray-800">{study.title}</h4>
            <p className="text-[10px] font-mono text-teal-600">{study.reference}</p>
            <p className="text-xs text-gray-500 mt-1">🎯 {study.themes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Discussion Starters Component
function DiscussionStartersSection() {
  const starters = [
    { category: "About God", questions: ["What impresses you most about Jesus?", "When did God become real to you?", "What does 'faith' mean to you personally?", "If God is real to you, what gives you that certainty?"] },
    { category: "About Prayer", questions: ["What is the most vivid experience of prayer you've had?", "When do you feel closest to God?", "What do you most want God to do for you?"] },
    { category: "Personal Growth", questions: ["What would you do if you knew you could not fail?", "What is your most satisfying accomplishment?", "What gives you self-respect?"] },
    { category: "Relationships", questions: ["Describe the person who has meant most in your life.", "What makes a person a good listener?", "What makes a 'good' marriage?"] },
    { category: "Reflective", questions: ["What event in the life of Christ means the most to you?", "When has God seemed furthest away from you?", "Of all the teachings of Jesus, what is most significant in your life?"] }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
        <p className="text-xs text-purple-700">💬 Use these questions to spark meaningful conversations and help group members open up.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {starters.map((starter, idx) => (
          <div key={idx} className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-black text-sm text-gray-800 mb-3">{starter.category}</h3>
            <ul className="space-y-2">
              {starter.questions.map((q, qIdx) => (
                <li key={qIdx} className="text-xs text-gray-600 flex items-start gap-2">
                  <Sparkles size={10} className="text-teal-500 mt-0.5 shrink-0" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Health & Safety Section
function HealthSafetySection() {
  const sections = [
    { icon: ClipboardCheck, title: "Board Approval & Risk Assessment", color: "from-blue-600 to-blue-500", items: ["Written board approval required", "Risk assessment by safeguarding officer", "Review annually or after incidents"] },
    { icon: Shield, title: "Safeguarding (Children & Vulnerable Adults)", color: "from-red-600 to-rose-600", items: ["DBS clearance for leaders", "Two-adult rule at all times", "Designated Safeguarding Lead", "Record keeping and reporting"] },
    { icon: Heart, title: "Health & Infection Control", color: "from-green-600 to-emerald-600", items: ["Illness guidance - stay home when sick", "Hand sanitizer and hygiene measures", "Consider vulnerable attendees"] },
    { icon: Home, title: "Venue & Environment Safety", color: "from-amber-600 to-orange-600", items: ["Evacuation routes known", "Clear exits and capacity", "Electrical and fire safety", "First aid kit available"] },
    { icon: Bell, title: "Emergency Preparedness", color: "from-red-600 to-red-500", items: ["Trained first aider or first aid kit", "Emergency contacts collected", "Incident reporting procedures"] },
    { icon: Utensils, title: "Food & Drink", color: "from-amber-600 to-yellow-600", items: ["Allergy awareness", "Proper food handling and storage"] },
    { icon: Car, title: "Transport & Outings", color: "from-blue-600 to-cyan-600", items: ["Valid licenses and insurance", "Parental consent for minors"] },
    { icon: Lock, title: "Confidentiality & Data Protection", color: "from-purple-600 to-violet-600", items: ["Information stored securely", "Consent for communication groups"] },
    { icon: Briefcase, title: "Insurance & Legal", color: "from-gray-600 to-slate-600", items: ["Insurance coverage confirmed", "Duty of care obligations"] }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 mb-4">
        <p className="text-xs text-red-700">⚠️ Complete all required checks before launching your Care Group. Review annually or after any incident.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sections.map((section, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center shrink-0`}>
              <section.icon size={14} className="text-white" />
            </div>
            <div>
              <h3 className="font-black text-xs text-gray-800">{section.title}</h3>
              <ul className="mt-1 space-y-0.5">
                {section.items.map((item, iIdx) => (
                  <li key={iIdx} className="text-[10px] text-gray-500 flex items-center gap-1">
                    <CheckCircle size={8} className="text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-red-50 rounded-xl p-4 mt-2">
        <div className="flex items-center gap-2 mb-2">
          <Bell size={14} className="text-red-600" />
          <h3 className="font-black text-xs text-red-800">Emergency Contacts</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div><span className="font-black">UK Emergency:</span> <span className="font-mono">999 / 112</span></div>
          <div><span className="font-black">NHS 111:</span> <span className="font-mono">111</span></div>
        </div>
      </div>
    </div>
  );
}

// Core Team Guidelines Section
function CoreTeamSection() {
  const roles = [
    { role: "Group Coordinator", responsibilities: ["Oversees all group activities", "Main contact for church leadership", "Ensures group follows guidelines"] },
    { role: "Assistant Coordinator", responsibilities: ["Supports coordinator", "Takes lead when coordinator absent", "Helps with follow-up"] },
    { role: "Worship Leader", responsibilities: ["Selects songs", "Leads song service", "Coordinates musicians if any"] },
    { role: "Prayer Coordinator", responsibilities: ["Manages prayer requests", "Leads prayer time", "Follows up on answered prayers"] },
    { role: "Bible Study Leader", responsibilities: ["Prepares study material", "Facilitates discussion", "Keeps study focused and on time"] },
    { role: "Hospitality Coordinator", responsibilities: ["Coordinates food and refreshments", "Manages venue setup", "Welcomes newcomers"] }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-4">
        <p className="text-xs text-indigo-700">👥 A healthy Care Group has a shared leadership model. Distribute responsibilities to prevent burnout and develop leaders.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {roles.map((role, idx) => (
          <div key={idx} className="border border-gray-100 rounded-xl p-3 hover:shadow-sm transition">
            <h3 className="font-black text-sm text-gray-800 flex items-center gap-2">
              <Crown size={12} className="text-amber-600" />
              {role.role}
            </h3>
            <ul className="mt-2 space-y-1">
              {role.responsibilities.map((resp, rIdx) => (
                <li key={rIdx} className="text-[10px] text-gray-500 flex items-start gap-1">
                  <CheckCircle size={8} className="text-teal-500 mt-0.5" />
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-teal-50 rounded-xl p-3">
        <p className="text-[10px] text-teal-700 flex items-center gap-1">
          <Star size={12} /> The CLEAR Framework: Community, Leadership, Evangelism, Accountability, Reproduction
        </p>
      </div>
    </div>
  );
}

// Main Bible Study Themes Container
function BibleStudyThemesContainer() {
  const [openTheme, setOpenTheme] = useState<string | null>("faith");

  const themes = [
    { id: "faith", title: "The Meaning of Faith", icon: Target, component: FaithTheme, color: "from-blue-600 to-indigo-600" },
    { id: "source", title: "Jesus - The Source of Life (NEWSTART)", icon: Sun, component: JesusSourceOfLifeTheme, color: "from-green-600 to-emerald-600" },
    { id: "mary", title: "The Life of Mary of Bethany", icon: Heart, component: MaryOfBethanyTheme, color: "from-purple-600 to-pink-600" },
    { id: "miracles", title: "Miracles of Jesus", icon: Sparkles, component: MiraclesTheme, color: "from-amber-600 to-orange-600" },
    { id: "parables1", title: "Parables of Jesus (Part 1)", icon: BookOpen, component: ParablesPartOneTheme, color: "from-indigo-600 to-blue-600" },
    { id: "parables2", title: "Parables of Jesus (Part 2)", icon: Scroll, component: ParablesPartTwoTheme, color: "from-indigo-600 to-purple-600" },
    { id: "lastweek", title: "Last Week of Jesus' Life", icon: Cross, component: LastWeekTheme, color: "from-red-600 to-rose-600" },
    { id: "comealive", title: "Come Alive! - 7 Lessons", icon: Flame, component: ComeAliveTheme, color: "from-pink-600 to-rose-600" },
    { id: "daniel", title: "The Life of Daniel", icon: Crown, component: DanielTheme, color: "from-cyan-600 to-blue-600" },
    { id: "david", title: "The Life of David", icon: Star, component: DavidTheme, color: "from-amber-600 to-yellow-600" },
    { id: "joseph", title: "The Life of Joseph", icon: Compass, component: JosephTheme, color: "from-teal-600 to-green-600" }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-2">
        <p className="text-xs text-blue-700">📖 These 11 major themes can sustain your group for approximately two years. Each theme contains multiple lessons with Bible references and discussion points.</p>
      </div>
      
      {themes.map((theme) => (
        <CollapsibleSection
          key={theme.id}
          title={theme.title}
          icon={theme.icon}
          color={theme.color}
          defaultOpen={openTheme === theme.id}
        >
          <theme.component />
        </CollapsibleSection>
      ))}
    </div>
  );
}

export default function ResourcesPage() {
  const params = useParams();
  const groupId = params?.groupId as string;
  const { canAccessGroup } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Resources", icon: Library },
    { id: "quick-tips", name: "Quick Tips", icon: Lightbulb },
    { id: "session-format", name: "Session Format", icon: Clock },
    { id: "bible-themes", name: "Bible Study Themes", icon: BookMarked },
    { id: "discussion", name: "Discussion Starters", icon: MessageCircle },
    { id: "core-team", name: "Core Team", icon: Users },
    { id: "health-safety", name: "Health & Safety", icon: Shield }
  ];

  if (!canAccessGroup(groupId)) {
    return (
      <AuthGuard>
        <DashboardShell>
          <div className="text-center py-20">
            <p className="text-gray-500">You don't have access to this group's resources.</p>
          </div>
        </DashboardShell>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <div className="space-y-8 pb-20">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href={`/group/${groupId}`} className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Library size={20} className="text-[#547189]" />
                <span className="text-[10px] font-black text-[#547189] uppercase tracking-wider">Care Group Resources</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
                Resource Hub
              </h1>
              <p className="text-gray-500 text-sm">Essential guides, study themes, and best practices for Care Group leaders</p>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#012169] text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
              >
                <cat.icon size={14} />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#012169] outline-none text-sm"
            />
          </div>

          {/* Content Sections */}
          <div className="space-y-4">
            {(activeCategory === "all" || activeCategory === "quick-tips") && (
              <CollapsibleSection 
                title="Quick Tips for Leaders" 
                icon={Lightbulb}
                color="from-teal-600 to-emerald-600"
                defaultOpen={activeCategory === "quick-tips"}
                badge="Essential best practices"
              >
                <QuickTipsSection />
              </CollapsibleSection>
            )}

            {(activeCategory === "all" || activeCategory === "session-format") && (
              <CollapsibleSection 
                title="Session Format Guide" 
                icon={Clock}
                color="from-blue-600 to-cyan-600"
                defaultOpen={activeCategory === "session-format"}
                badge="Sustainable meeting structure"
              >
                <SessionFormatSection />
              </CollapsibleSection>
            )}

            {(activeCategory === "all" || activeCategory === "bible-themes") && (
              <CollapsibleSection 
                title="Bible Study Themes & Topics" 
                icon={BookMarked}
                color="from-purple-600 to-indigo-600"
                defaultOpen={activeCategory === "bible-themes" || activeCategory === "all"}
                badge="11 major themes • 100+ lessons • 2+ years of material"
              >
                <BibleStudyThemesContainer />
              </CollapsibleSection>
            )}

            {(activeCategory === "all" || activeCategory === "discussion") && (
              <CollapsibleSection 
                title="Discussion Starters" 
                icon={MessageCircle}
                color="from-amber-600 to-orange-600"
                defaultOpen={activeCategory === "discussion"}
                badge="Icebreakers & reflection questions"
              >
                <DiscussionStartersSection />
              </CollapsibleSection>
            )}

            {(activeCategory === "all" || activeCategory === "core-team") && (
              <CollapsibleSection 
                title="Core Team Guidelines" 
                icon={Users}
                color="from-indigo-600 to-purple-600"
                defaultOpen={activeCategory === "core-team"}
                badge="Shared leadership model"
              >
                <CoreTeamSection />
              </CollapsibleSection>
            )}

            {(activeCategory === "all" || activeCategory === "health-safety") && (
              <CollapsibleSection 
                title="Health & Safety Compliance" 
                icon={Shield}
                color="from-red-600 to-rose-600"
                defaultOpen={activeCategory === "health-safety"}
                badge="UK & BUC requirements"
              >
                <HealthSafetySection />
              </CollapsibleSection>
            )}
          </div>

          {/* Footer Note */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-[9px] text-gray-400">
              Based on Bethel Willenhall Care Group guidelines • Updated {new Date().toLocaleDateString('en-GB')}
            </p>
          </div>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}