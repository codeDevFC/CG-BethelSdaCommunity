// app/group/[groupId]/study-hub/page.tsx
"use client";
import { use } from "react";
import Link from 'next/link';
import { 
  ArrowLeft, Home, BookOpen, Library, ChevronRight, 
  Target, Heart, Star, BookText, GraduationCap, 
  Users, Church, Shield, Crown, Flame, Sparkles,
  Search, Award, TrendingUp, Map, Cross, 
  Bible, Lock, Unlock, CheckCircle, Clock,
  Calendar, Globe, MessageCircle, DollarSign,
  Baby, Briefcase, Music, Mic, Pen, Video,
  Coffee, Sun, Moon, Cloud, Tree, Compass,
  Anchor, Feather, Wind, Droplet, Fire,
  Scroll, AlertTriangle, Eye
} from "lucide-react";

// Complete curriculum data structure with all topics ready to populate
export const curriculumData = [
  {
    level: "Level 1",
    title: "To Know Jesus",
    subtitle: "SEEKER-FOCUSED STUDIES",
    description: "Foundational truths for those exploring faith. Discover who Jesus is and what He offers.",
    color: "from-blue-600 to-blue-500",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    hoverColor: "hover:border-blue-300",
    icon: <Target size={28} />,
    series: [
      { 
        title: "Reliability of the Bible", 
        slug: "reliability", 
        duration: "6 lessons", 
        icon: <BookText size={14} />, 
        description: "Why trust the Bible as God's Word?",
        topics: ["Introduction to Scripture", "Manuscript Evidence", "Archaeological Proof", "Prophetic Accuracy", "Internal Consistency", "Transformative Power"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Steps to Jesus", 
        slug: "steps-to-jesus", 
        duration: "5 lessons", 
        icon: <Star size={14} />, 
        description: "Classic Steps to Christ journey",
        topics: ["God's Love for Us", "The Sinner's Need", "Repentance", "Faith and Acceptance", "Discipleship"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Explorer Class Series", 
        slug: "explorer-class", 
        duration: "18 lessons", 
        icon: <GraduationCap size={14} />, 
        description: "18 foundational Bible lessons for seekers",
        topics: ["God's Plan of Salvation", "The Great Controversy", "The Law of God", "The Sabbath Rest", "The Sanctuary", "Death and Resurrection", "The Second Coming", "The Millennium", "The New Earth"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Come Alive with Jesus", 
        slug: "come-alive", 
        duration: "7 lessons", 
        icon: <Heart size={14} />, 
        description: "New life in Christ",
        topics: ["New Birth Experience", "Daily Devotional Life", "Prayer and Fasting", "Bible Study Methods", "Fellowship and Community", "Witnessing and Service", "Growing in Grace"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Search for Certainty", 
        slug: "search-for-certainty", 
        duration: "30 lessons", 
        icon: <Search size={14} />, 
        description: "30 lessons on biblical faith",
        topics: ["Is There a God?", "Does God Care About Me?", "Is the Bible Trustworthy?", "Who is Jesus?", "Why Did Jesus Die?", "How Can I Be Saved?", "What About the Sabbath?", "What Happens When I Die?", "Will Jesus Return?", "How Should I Live?"],
        status: "coming-soon",
        progress: 0
      }
    ]
  },
  {
    level: "Level 2",
    title: "To Grow in Jesus",
    subtitle: "NEW BELIEVER FOCUS",
    description: "Deepen your faith through systematic Bible study and understanding of God's plan.",
    color: "from-green-600 to-emerald-500",
    bgLight: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200",
    hoverColor: "hover:border-green-300",
    icon: <Users size={28} />,
    series: [
      { 
        title: "Stay Alive with Jesus", 
        slug: "stay-alive", 
        duration: "15 lessons", 
        icon: <Heart size={14} />, 
        description: "Essential truths for new believers",
        topics: ["Assurance of Salvation", "The Word of God", "Prayer Life", "Fellowship", "Witnessing", "Overcoming Temptation", "Spiritual Gifts", "Church Membership", "Baptism", "The Lord's Supper", "Stewardship", "The Sabbath", "Health and Wholeness", "Christian Service", "Hope of Second Coming"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "The Branch and The Vine", 
        slug: "branch-and-vine", 
        duration: "10 lessons", 
        icon: <Flame size={14} />, 
        description: "Abiding in Christ",
        topics: ["The True Vine", "The Gardener's Care", "Fruitful Branches", "Pruning for Growth", "Abiding in Love", "Joy Complete", "Friendship with Christ", "Chosen and Appointed", "Answered Prayer", "Love One Another"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Sanctuary: Heaven's Blueprint", 
        slug: "sanctuary", 
        duration: "12 lessons", 
        icon: <Church size={14} />, 
        description: "The gospel in symbols",
        topics: ["Why a Sanctuary?", "The Courtyard: Sacrifice", "The Holy Place: Service", "The Lampstand: Light", "The Table of Showbread: Word", "The Altar of Incense: Prayer", "The Most Holy Place: Presence", "The Ark of the Covenant: Law", "The Day of Atonement: Judgment", "The Scapegoat: Sin Removed", "Christ Our High Priest", "The Heavenly Sanctuary Today"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Secrets of Prophecy", 
        slug: "secrets-of-prophecy", 
        duration: "24 lessons", 
        icon: <Map size={14} />, 
        description: "Understanding Daniel and Revelation",
        topics: ["Introduction to Prophecy", "Daniel 2: The Great Image", "Daniel 7: Four Beasts", "Daniel 8: The Ram and Goat", "Daniel 9: The 70 Weeks", "Revelation 1: The Glorified Christ", "Revelation 2-3: Seven Churches", "Revelation 12: The Dragon and Woman", "Revelation 13: Beasts", "Revelation 14: Three Angels", "Revelation 20: The Millennium", "Revelation 21-22: New Earth"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Discover: 3 Angels & RBF", 
        slug: "discover", 
        duration: "30 lessons", 
        icon: <Shield size={14} />, 
        description: "Three Angels' Messages & Righteousness by Faith",
        topics: ["The Everlasting Gospel", "Fear God and Give Glory", "Worship the Creator", "Babylon is Fallen", "Come Out of Her", "The Mark of the Beast", "The Seal of God", "The Remnant Church", "The Spirit of Prophecy", "Righteousness by Faith", "Justification", "Sanctification", "Glorification", "The New Covenant", "The Law and Grace"],
        status: "coming-soon",
        progress: 0
      }
    ]
  },
  {
    level: "Level 3",
    title: "To Mature in Jesus",
    subtitle: "DISCIPLESHIP FOCUS",
    description: "Live out your faith in every area of life through intentional discipleship.",
    color: "from-amber-600 to-orange-500",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    borderColor: "border-amber-200",
    hoverColor: "hover:border-amber-300",
    icon: <Award size={28} />,
    series: [
      { 
        title: "Excellence in Life", 
        slug: "excellence-in-life", 
        duration: "7 lessons", 
        icon: <TrendingUp size={14} />, 
        description: "Living at your best",
        topics: ["What is Excellence?", "Excellence in Character", "Excellence in Work", "Excellence in Relationships", "Excellence in Health", "Excellence in Stewardship", "Excellence in Service"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Courtship & Relationship", 
        slug: "courtship", 
        duration: "9 lessons", 
        icon: <Heart size={14} />, 
        description: "God's design for love",
        topics: ["God's Plan for Relationships", "Friendship Foundation", "Purity and Boundaries", "Choosing a Partner", "The Courtship Process", "Communication Skills", "Conflict Resolution", "Engagement Preparation", "Marriage Covenant"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Christian Parenting", 
        slug: "parenting", 
        duration: "12 lessons", 
        icon: <Users size={14} />, 
        description: "God's blueprint for raising godly children",
        topics: ["God's Ownership of Children", "Divine Commission to Parents", "Love and Trust Foundation", "Obedience and Discipline", "Spirituality in Early Childhood", "Encouraging Love for Scripture", "Family Worship and Prayer", "Sabbath as a Delight", "The Church as Partner", "Choosing Companions Wisely", "Navigating Media and Recreation", "True Education for Eternity"],
        status: "available",
        progress: 0
      },
      { 
        title: "Being a Godly Man", 
        slug: "godly-man", 
        duration: "5 lessons", 
        icon: <Shield size={14} />, 
        description: "Biblical manhood",
        topics: ["Created in God's Image", "Leadership in the Home", "Provider and Protector", "Spiritual Warrior", "Legacy Builder"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Christian Finance", 
        slug: "finance", 
        duration: "5 lessons", 
        icon: <Target size={14} />, 
        description: "Stewardship and wealth",
        topics: ["God Owns Everything", "Faithful Stewardship", "Tithing and Offerings", "Budgeting and Debt", "Generosity and Giving"],
        status: "coming-soon",
        progress: 0
      }
    ]
  },
  {
    level: "Level 4",
    title: "Extra Meat",
    subtitle: "DEEP DIVE STUDIES",
    description: "Advanced studies for spiritual depth and ministry training.",
    color: "from-purple-600 to-violet-600",
    bgLight: "bg-purple-50",
    textColor: "text-purple-600",
    borderColor: "border-purple-200",
    hoverColor: "hover:border-purple-300",
    icon: <BookOpen size={28} />,
    series: [
      { 
        title: "Seven Churches of Revelation", 
        slug: "seven-churches", 
        duration: "8 lessons", 
        icon: <Scroll size={14} />, 
        description: "Jesus' love letters to His church — prophetic messages spanning 2,000 years",
        topics: ["Introduction", "Ephesus: Lost Love", "Smyrna: Persecution", "Pergamos: Compromise", "Thyatira: Apostasy", "Sardis: Dead Church", "Philadelphia: Open Door", "Laodicea: Lukewarm"],
        status: "available",
        progress: 0
      },
      { 
        title: "Desire of Ages", 
        slug: "desire-of-ages", 
        duration: "87 chapters", 
        icon: <BookOpen size={14} />, 
        description: "Life of Christ - A verse-by-verse journey through the life of Jesus",
        topics: ["The Birth of Jesus", "Early Ministry", "The Sermon on the Mount", "Miracles of Jesus", "Parables of the Kingdom", "The Passion Week", "The Crucifixion", "The Resurrection", "The Ascension"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Great Controversy", 
        slug: "great-controversy", 
        duration: "42 chapters", 
        icon: <Shield size={14} />, 
        description: "Cosmic conflict between Christ and Satan",
        topics: ["Origin of Evil", "The Fall of Man", "The First Great Deception", "The Waldenses", "The Reformation", "The French Revolution", "The Great Awakening", "The Advent Movement", "The Investigative Judgment", "The Mark of the Beast", "The Time of Trouble", "The Second Coming", "The Millennium", "The New Earth"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Patriarchs and Prophets", 
        slug: "patriarchs-prophets", 
        duration: "30 chapters", 
        icon: <Compass size={14} />, 
        description: "From creation to David - Old Testament stories",
        topics: ["Creation", "The Fall", "Cain and Abel", "Noah and the Flood", "Abraham's Call", "Isaac and Rebekah", "Jacob and Esau", "Joseph in Egypt", "Moses and the Exodus", "The Ten Commandments", "The Sanctuary", "Joshua and Canaan"],
        status: "coming-soon",
        progress: 0
      },
      { 
        title: "Acts of the Apostles", 
        slug: "acts-apostles", 
        duration: "20 chapters", 
        icon: <Church size={14} />, 
        description: "Birth and growth of the early church",
        topics: ["Pentecost", "Peter and John", "Stephen's Martyrdom", "Saul's Conversion", "Paul's Missionary Journeys", "The Jerusalem Council", "Philippi and Thessalonica", "Athens and Corinth", "Ephesus Ministry", "Paul's Arrest", "Shipwreck to Rome", "The Early Church Legacy"],
        status: "coming-soon",
        progress: 0
      }
    ]
  }
];

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    BookText, Heart, Star, GraduationCap, Search, Users, Flame, Church, Map, Shield,
    TrendingUp, Award, BookOpen, Scroll, Compass
  };
  return icons[iconName] || BookOpen;
};

export default function StudyHubPage({ params }: { params: Promise<{ groupId: string }> }) {
  const resolvedParams = use(params);
  const groupId = resolvedParams.groupId || "1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <Link 
            href={`/groups/${groupId}`} 
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          
          <div className="flex gap-3">
            <Link 
              href={`/group/${groupId}/study-hub/resources-corner`} 
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-medium text-sm hover:bg-indigo-100 transition-all hover:shadow-md"
            >
              <Library size={16} /> Resources Corner
            </Link>
            <Link 
              href={`/group/${groupId}/study-hub/my-progress`} 
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition-all"
            >
              <TrendingUp size={16} /> My Progress
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mt-12 mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-4">
            <GraduationCap size={16} className="text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Guided Discipleship Path</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Study Hub
          </h1>
          <p className="text-gray-500 font-medium text-sm uppercase tracking-[0.2em] max-w-2xl mx-auto">
            4 Levels of Spiritual Growth • 200+ Lessons • Complete Discipleship Journey
          </p>
        </div>

        {/* Curriculum Levels */}
        <div className="space-y-16">
          {curriculumData.map((level, idx) => (
            <div key={idx} className="relative">
              {/* Level Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className={`hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${level.color} text-white shadow-lg`}>
                    {level.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${level.color} text-white`}>
                        {level.level}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {level.subtitle}
                      </span>
                    </div>
                    <h2 className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                      {level.title}
                    </h2>
                    <p className="text-gray-500 text-sm mt-2 max-w-2xl">
                      {level.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Series Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {level.series.map((series, sIdx) => {
                  const IconComponent = series.icon.type || getIconComponent(series.icon.props.children);
                  const isAvailable = series.status === "available";
                  
                  return (
                    <Link
                      key={sIdx}
                      href={isAvailable ? `/group/${groupId}/study-hub/${series.slug}` : "#"}
                      onClick={(e) => {
                        if (!isAvailable) {
                          e.preventDefault();
                          alert("This study series is coming soon!");
                        }
                      }}
                      className={`group relative bg-white rounded-2xl border ${level.borderColor} ${level.hoverColor} p-5 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-transparent overflow-hidden ${
                        !isAvailable ? 'opacity-75' : ''
                      }`}
                    >
                      {/* Status Badge */}
                      {!isAvailable && (
                        <div className="absolute top-3 right-3">
                          <span className="text-[8px] font-black bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                            Coming Soon
                          </span>
                        </div>
                      )}
                      
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl ${level.bgLight} ${level.textColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        {series.icon}
                      </div>
                      
                      {/* Title & Duration */}
                      <h3 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-1">
                        {series.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Clock size={10} className="text-gray-400" />
                        <span className="text-[9px] font-medium text-gray-400 uppercase tracking-wider">
                          {series.duration}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                        {series.description}
                      </p>
                      
                      {/* Topics Preview */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex flex-wrap gap-1">
                          {series.topics.slice(0, 2).map((topic, tIdx) => (
                            <span key={tIdx} className="text-[8px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                              {topic.length > 20 ? topic.substring(0, 20) + "..." : topic}
                            </span>
                          ))}
                          {series.topics.length > 2 && (
                            <span className="text-[8px] text-gray-400">+{series.topics.length - 2} more</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action */}
                      <div className="flex items-center justify-between mt-4">
                        <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${
                          isAvailable ? 'text-indigo-600 group-hover:text-indigo-700' : 'text-gray-400'
                        }`}>
                          {isAvailable ? "Start Study" : "Preview Available"}
                        </span>
                        <ChevronRight size={14} className={`transition-all ${
                          isAvailable ? 'text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-1' : 'text-gray-300'
                        }`} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer - Quick Stats */}
        <div className="mt-20 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-gray-800">4</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Levels of Growth</div>
            </div>
            <div>
              <div className="text-3xl font-black text-gray-800">20+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Study Series</div>
            </div>
            <div>
              <div className="text-3xl font-black text-gray-800">200+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Individual Lessons</div>
            </div>
            <div>
              <div className="text-3xl font-black text-gray-800">∞</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Grace Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}