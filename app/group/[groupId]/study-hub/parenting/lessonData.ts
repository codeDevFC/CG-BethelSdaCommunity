// app/group/[groupId]/study-hub/parenting/lessonData.ts
export interface LessonSection {
  title: string;
  content: string[];
  scripture?: string;
  note?: string;
  quote?: {
    text: string;
    author: string;
  };
  reflection?: string[];
}

export interface ParentingLesson {
  id: number;
  title: string;
  subtitle: string;
  introduction: string;
  memoryVerse: string;
  sections: LessonSection[];
  reflectionQuestions: string[];
  prayerPrompt: string;
  keyWords: Array<{ word: string; definition: string }>;
  application?: string[];
  parentChildActivity?: string;
  audioFile?: string;
}

export const parentingData = {
  1: {
    id: 1,
    title: "God's Ownership of Our Children",
    subtitle: "A precious trust from heaven",
    introduction: "Children are not our possessions—they are God's precious gifts entrusted to our care. Understanding this truth transforms how we view our role as parents and deepens our sense of stewardship.",
    memoryVerse: "Psalm 127:3 (NKJV) — 'Behold, children are a heritage from the LORD, the fruit of the womb is a reward.'",
    sections: [
      {
        title: "Children Belong to God",
        content: [
          "The Bible makes it clear that children are not merely our offspring but are first and foremost God's creation. He is their Creator and rightful Owner. As parents, we are entrusted with the sacred responsibility of caring for His little ones.",
          "When we recognize that our children belong to God, our perspective shifts. We become stewards rather than owners. This understanding humbles us and reminds us that we will give an account to God for how we raised His children.",
          "The psalmist declares that children are a 'heritage' from the Lord—a gift, a trust, a sacred treasure. This word heritage implies something precious that is passed down, something of great value that must be carefully preserved and nurtured."
        ],
        scripture: "Psalm 127:3 — 'Behold, children are a heritage from the LORD, the fruit of the womb is a reward.'",
        quote: {
          text: "Your children are not your own. They are the Lord's, and you are to train them for Him.",
          author: "Ellen G. White, The Adventist Home, p. 159"
        }
      },
      {
        title: "A Sacred Trust",
        content: [
          "The concept of stewardship is woven throughout Scripture. From the beginning, God entrusted Adam and Eve with the care of His creation. In the same way, He entrusts parents with the care of His children.",
          "This trust carries both privilege and responsibility. We have the privilege of shaping young lives, of influencing eternal destinies. But we also bear the weighty responsibility of being faithful stewards.",
          "Every child is unique, created by God with specific gifts, temperament, and purpose. Our role as parents is not to mold them into our image but to help them discover and fulfill God's plan for their lives."
        ],
        note: "Consider: How does viewing your children as God's property change the way you discipline, nurture, and pray for them?"
      },
      {
        title: "Answerable to God",
        content: [
          "One day, every parent will stand before God and give an account of their stewardship. This is both sobering and motivating. It reminds us that parenting is not merely a human endeavor but a divine calling.",
          "The question we must ask ourselves is not 'What do I want for my child?' but 'What does God want for His child?' This shift in focus helps us align our parenting with God's purposes rather than our own ambitions.",
          "When we see ourselves as answerable to God, we become more intentional. We pray more earnestly, we teach more diligently, and we model Christ more consistently. We recognize that the eternal destiny of our children hangs in the balance."
        ],
        reflection: [
          "How would your parenting change if you truly believed you will give an account to God for your children?",
          "In what areas of parenting have you been acting like an owner rather than a steward?"
        ]
      }
    ],
    reflectionQuestions: [
      "What does it mean to view your children as a 'heritage from the LORD'?",
      "How does recognizing God's ownership affect your parenting decisions?",
      "What areas of your parenting need to be surrendered more fully to God?",
      "How can you cultivate a deeper sense of stewardship in your daily parenting?"
    ],
    prayerPrompt: "Heavenly Father, thank You for entrusting these precious children to my care. Help me to remember that they are Yours first. Give me wisdom to be a faithful steward, and remind me daily that I am raising Your children for Your glory. Amen.",
    keyWords: [
      { word: "Heritage", definition: "Something passed down from one generation to another; a special possession or gift." },
      { word: "Stewardship", definition: "The responsible management of something entrusted to one's care." },
      { word: "Trust", definition: "The responsibility placed on someone to care for something valuable." }
    ],
    application: [
      "Write a prayer dedicating your children back to God this week.",
      "Create a 'stewardship journal' where you record how God is leading in your parenting.",
      "Share with your children that they are a gift from God and how much you treasure them."
    ],
    parentChildActivity: "Create a 'Thank You God for You' jar. Together with your child, decorate a jar and fill it with notes about why you're thankful for them. Read one note together each evening as a reminder that they are God's precious gift.",
    audioFile: "/audio/parenting/lesson1.mp3"
  },
  2: {
    id: 2,
    title: "A Divine Commission to Parents",
    subtitle: "Called to be God's partners",
    introduction: "Parenting is more than a biological role—it is a divine calling. God has commissioned parents to be His partners in shaping the next generation for His kingdom. This sacred responsibility requires intentionality, dedication, and dependence on divine wisdom.",
    memoryVerse: "Deuteronomy 6:6-7 (NKJV) — 'And these words which I command you today shall be in your heart. You shall teach them diligently to your children, and shall talk of them when you sit in your house, when you walk by the way, when you lie down, and when you rise up.'",
    sections: [
      {
        title: "A Sacred Calling",
        content: [
          "God doesn't view parenting as an interruption to ministry—He sees it as ministry itself. The home is the first and most important school, and parents are the primary teachers. This is a divine commission, not a secondary responsibility.",
          "Throughout Scripture, we see God's emphasis on the role of parents. From Abraham, whom God chose because he would 'command his children and his household after him' (Genesis 18:19), to Timothy, who was shaped by the sincere faith of his mother and grandmother.",
          "When we embrace parenting as a calling from God, it elevates the everyday moments of training, teaching, and nurturing to sacred acts of service."
        ],
        scripture: "Genesis 18:19 — 'For I have known him, in order that he may command his children and his household after him, that they keep the way of the LORD.'"
      },
      {
        title: "The Heart of the Commission",
        content: [
          "Deuteronomy 6 gives us the blueprint for fulfilling our parental commission. Notice where it begins: 'These words which I command you today shall be in your heart.' Before we can effectively teach our children, God's Word must first dwell richly in us.",
          "The instruction to teach 'diligently' implies intentionality and consistency. This isn't a once-a-week lesson but a lifestyle of discipleship. The home becomes a classroom, and every moment becomes a teaching opportunity.",
          "The four settings mentioned—sitting, walking, lying down, rising up—cover all of life. This teaches us that spiritual training isn't compartmentalized; it's woven into the fabric of daily family life."
        ],
        quote: {
          text: "The work of parents is a work that is to be carried forward in the home. It is the most important work ever committed to human beings.",
          author: "Ellen G. White, The Adventist Home, p. 256"
        }
      },
      {
        title: "Partners with God",
        content: [
          "God doesn't call us to parent alone. He promises to be our partner, providing wisdom, patience, and love beyond our natural capacity. When we feel inadequate—and we all do—we can draw on His limitless resources.",
          "Our children have two parents: their earthly parents and their heavenly Father. We are co-laborers with God in the sacred work of nurturing young souls for eternity.",
          "This partnership means we pray not only for our children but also for ourselves—for wisdom, for patience, for love that reflects God's heart. It means we confess our mistakes and rely on His grace to cover our shortcomings."
        ],
        note: "Remember: God chose you to be the parent of your specific children. He knew your strengths and weaknesses and still entrusted them to your care. He will equip you for this calling."
      }
    ],
    reflectionQuestions: [
      "How does viewing parenting as a 'divine commission' change your perspective on daily tasks?",
      "In what ways are you currently 'teaching diligently' to your children?",
      "What barriers prevent you from making spiritual training a natural part of daily life?",
      "How can you better partner with God in raising your children?"
    ],
    prayerPrompt: "Lord, I accept the sacred calling of parenting. Fill my heart with Your Word so that it overflows into the lives of my children. Give me wisdom for each teaching moment and remind me that I am Your partner in this holy work. Amen.",
    keyWords: [
      { word: "Commission", definition: "An official assignment or task; a calling to fulfill a specific purpose." },
      { word: "Diligently", definition: "With persistent and careful effort; consistently and intentionally." },
      { word: "Discipleship", definition: "The process of teaching and training someone to follow and become like Christ." }
    ],
    application: [
      "Choose one Scripture this week to memorize as a family.",
      "Identify three 'teachable moments' in your daily routine and intentionally use them for spiritual conversation.",
      "Create a family mission statement that reflects your commitment to raising godly children."
    ],
    parentChildActivity: "Make a 'Teaching Times' chart together. Draw pictures representing the four times mentioned in Deuteronomy 6: sitting, walking, lying down, rising up. Each day, find a way to talk about God during each of these times.",
    audioFile: "/audio/parenting/lesson2.mp3"
  },
  3: {
    id: 3,
    title: "The First Steps: Love and Trust",
    subtitle: "Building the foundation",
    introduction: "Every child's journey begins with the foundational experiences of love and trust. In the early years, parents have the privilege of showing children what God's love looks like—patient, kind, and unconditional. This foundation prepares them to trust not only their parents but ultimately their Heavenly Father.",
    memoryVerse: "1 John 4:19 (NKJV) — 'We love Him because He first loved us.'",
    sections: [
      {
        title: "Love as the Foundation",
        content: [
          "Before children can understand theology or memorize Scripture, they must first experience love. The love we show our children becomes their template for understanding God's love. When we love them consistently, patiently, and unconditionally, we're laying the groundwork for their faith.",
          "Infants and young children learn trust through consistent care. When they cry, they need to be comforted. When they're hungry, they need to be fed. This responsiveness teaches them that they are valued and that their needs matter to someone.",
          "This isn't about perfection—no parent can respond perfectly every time. But it's about patterns. A consistent pattern of loving care builds the secure attachment that becomes the foundation for healthy relationships with God and others."
        ],
        scripture: "Psalm 36:7 — 'How precious is Your lovingkindness, O God! Therefore the children of men put their trust under the shadow of Your wings.'"
      },
      {
        title: "Teaching Love Through Experience",
        content: [
          "Children learn love by experiencing it. When we speak kind words, offer gentle touch, spend quality time, and meet their needs, we're demonstrating love in ways they can understand. These experiences create a reservoir of security that sustains them through challenges.",
          "The love we show must be unconditional—not based on performance. Children need to know that they are loved not because they are good or achieve, but because they are ours. This unconditional love mirrors God's grace.",
          "When children experience unconditional love at home, they develop the emotional security to explore, learn, and grow. They're free to make mistakes because they know their place in the family is secure."
        ],
        quote: {
          text: "The child's first teacher is the mother. During the period of greatest impressibility and most rapid development, his education is in her hands.",
          author: "Ellen G. White, The Adventist Home, p. 183"
        }
      },
      {
        title: "Building Trust for the Future",
        content: [
          "The trust built in early childhood becomes the foundation for future faith. Children who learn to trust their parents' love and care are better prepared to trust in God's love and care. The consistency of earthly parents becomes a picture of the heavenly Father's faithfulness.",
          "This trust isn't built overnight but through thousands of small, consistent interactions. Each time we keep a promise, respond with patience, or provide comfort in distress, we're strengthening the trust bond.",
          "Even when we fail, we can model repentance and grace. Admitting our mistakes and seeking forgiveness teaches children that relationships can be repaired and that love covers imperfections."
        ],
        reflection: [
          "How does your child experience love from you? Is it conditional or unconditional?",
          "What messages about trust are you communicating through your consistency (or inconsistency)?",
          "How can you better reflect God's patient, kind love to your children?"
        ]
      }
    ],
    reflectionQuestions: [
      "What did you learn about love and trust from your own parents?",
      "How can you make your love more unconditional and less performance-based?",
      "What specific actions can you take this week to build trust with your child?",
      "How does your parenting reflect God's 'first love' for your children?"
    ],
    prayerPrompt: "Gracious Father, help me to love my children as You love me—unconditionally, patiently, and consistently. Teach me to build trust through faithful care and to reflect Your heart in my interactions. Let my love prepare them to receive Your perfect love. Amen.",
    keyWords: [
      { word: "Unconditional Love", definition: "Love given freely without requiring anything in return or based on performance." },
      { word: "Secure Attachment", definition: "A healthy emotional bond built through consistent, responsive care." },
      { word: "Foundation", definition: "The underlying base or support; the essential groundwork for future development." }
    ],
    application: [
      "Practice five minutes of undivided attention with your child daily this week.",
      "Notice and record three ways your child experiences your love today.",
      "When you fail, model repentance by apologizing and asking for forgiveness."
    ],
    parentChildActivity: "Create a 'Love Book' together. Cut out magazine pictures or draw scenes showing love—hugs, helping, sharing, caring. Talk about how God's love is like that, even bigger and better!",
    audioFile: "/audio/parenting/lesson3.mp3"
  },
  4: {
    id: 4,
    title: "The Second Steps: Obedience and Discipline",
    subtitle: "Training in righteousness",
    introduction: "Love provides the foundation, but discipline provides the structure. God's methods for training children reflect His own character—firm yet loving, consistent yet merciful. Learning to guide children toward obedience is essential preparation for a life of following God.",
    memoryVerse: "Proverbs 22:6 (NKJV) — 'Train up a child in the way he should go, and when he is old he will not depart from it.'",
    sections: [
      {
        title: "The Purpose of Discipline",
        content: [
          "Discipline is often misunderstood as punishment, but its true purpose is training and discipleship. The word 'disciple' shares the same root—discipline is about making followers. Our goal isn't merely obedient behavior but transformed hearts that choose to follow God.",
          "Effective discipline teaches children why certain behaviors are right or wrong, not just that they're prohibited. It connects actions to consequences and choices to character. Most importantly, it points children to God's standards and His grace.",
          "Hebrews 12 reminds us that God disciplines those He loves. As parents, we discipline not because we're angry but because we love our children and want what's best for them."
        ],
        scripture: "Hebrews 12:11 — 'Now no chastening seems to be joyful for the present, but painful; nevertheless, afterward it yields the peaceable fruit of righteousness to those who have been trained by it.'"
      },
      {
        title: "God's Methods of Discipline",
        content: [
          "God's discipline is always redemptive. He doesn't punish for the sake of punishment but to correct, teach, and restore. His methods include natural consequences (allowing us to experience results of choices), divine instruction (teaching through His Word), and loving correction (conviction by the Spirit).",
          "As parents, we can follow this pattern. Natural consequences teach powerful lessons without us having to impose arbitrary penalties. Logical consequences connect directly to the misbehavior. And always, correction should be followed by restoration and reassurance of love.",
          "Consistency is crucial. Children need to know what to expect and that boundaries are firm. Inconsistent discipline creates insecurity and tests boundaries. Consistent, predictable boundaries create security."
        ],
        quote: {
          text: "The rod of correction, judiciously used, will be of great value to the child. But never should it be used in anger, nor in any case where it would cause the child to think that his parents are acting from impulse.",
          author: "Ellen G. White, The Adventist Home, p. 313"
        }
      },
      {
        title: "Teaching the Heart",
        content: [
          "The ultimate goal of discipline is not external compliance but internal transformation. We want our children to obey not just when we're watching but when no one is watching—because their hearts have been changed.",
          "This requires going beyond behavior management to heart engagement. When disobedience occurs, we need to address not just the action but the attitudes behind it—selfishness, pride, defiance, or dishonesty.",
          "Teaching the heart involves helping children understand God's reasons for His commands. When they grasp that God's rules are for their good and protection, obedience becomes a willing response rather than reluctant compliance."
        ],
        reflection: [
          "Do you discipline more for external behavior or heart transformation?",
          "How do you respond when your child disobeys? Is it consistent and loving?",
          "What does your discipline teach your child about God's character?"
        ]
      }
    ],
    reflectionQuestions: [
      "What is your primary goal when disciplining your child?",
      "How can you make your discipline more consistent and predictable?",
      "In what ways do you use natural consequences in training your children?",
      "How can you better address the heart issues behind misbehavior?"
    ],
    prayerPrompt: "Heavenly Father, give me wisdom to discipline as You do—firmly, lovingly, and redemptively. Help me see past behavior to the heart. Teach me to be consistent and to always point my children back to Your grace and Your ways. Amen.",
    keyWords: [
      { word: "Discipline", definition: "Training that corrects, molds, or perfects; discipleship through guidance and correction." },
      { word: "Natural Consequences", definition: "Results that naturally follow a choice without parental intervention." },
      { word: "Heart Transformation", definition: "Change that occurs at the core of one's being, affecting desires and motivations." }
    ],
    application: [
      "Before disciplining this week, pause and ask: 'What is the heart issue here?'",
      "Choose one area of inconsistency and work toward greater consistency in response.",
      "After correction, intentionally reconnect with your child to reassure them of your love."
    ],
    parentChildActivity: "Play the 'If-Then' game. Make cards with 'if' scenarios (if you touch a hot stove) and 'then' consequences (you get burned). Talk about how God's rules protect us, like loving parents setting boundaries.",
    audioFile: "/audio/parenting/lesson4.mp3"
  },
  5: {
    id: 5,
    title: "Spirituality During Early Childhood",
    subtitle: "Nurturing young faith",
    introduction: "The early years are a critical window for faith formation. Young children are naturally receptive to spiritual truths, and the impressions made during these years often last a lifetime. Understanding how young children learn and grow spiritually helps us nurture their faith effectively.",
    memoryVerse: "Ecclesiastes 12:1 (NKJV) — 'Remember now your Creator in the days of your youth, before the difficult days come.'",
    sections: [
      {
        title: "The Receptive Years",
        content: [
          "Early childhood is a time of remarkable spiritual receptivity. Children believe easily, trust readily, and form lasting impressions. Jesus recognized this when He said, 'Let the little children come to Me' (Matthew 19:14).",
          "During these years, children develop their basic understanding of God. If they experience God through loving parents, they form a positive view of God as loving and trustworthy. If they experience harshness or inconsistency, their view of God may be distorted.",
          "This doesn't mean we should pressure young children toward premature decisions. Instead, we create an environment where faith can grow naturally—like seeds planted in good soil."
        ],
        scripture: "Mark 10:15 — 'Assuredly, I say to you, whoever does not receive the kingdom of God as a little child will by no means enter it.'"
      },
      {
        title: "Creating a Spiritual Environment",
        content: [
          "Young children learn through their senses and through experience. A spiritual environment surrounds them with reminders of God's presence—through Bible stories, prayer, music, and conversations about God's goodness.",
          "This doesn't require elaborate programs. Simple practices make deep impressions: praying before meals, singing songs about Jesus, looking at picture Bibles, talking about God's creation during walks.",
          "Consistency matters more than complexity. Short, regular times of spiritual connection are more effective than occasional elaborate events. Children thrive on routine, and spiritual routines become treasured traditions."
        ],
        quote: {
          text: "The mother's influence upon her children is most important. She can mold their minds and character after the divine similitude. She can teach them to love the Bible and to love the Saviour.",
          author: "Ellen G. White, The Adventist Home, p. 184"
        }
      },
      {
        title: "Age-Appropriate Faith",
        content: [
          "Young children understand spiritual truths differently than adults. They think concretely, not abstractly. They understand simple concepts like 'God loves you' and 'Jesus is your friend' more easily than complex theology.",
          "Bible stories should focus on God's love and care rather than frightening details. Prayer should be simple and conversational. Worship should be engaging and participatory, not passive.",
          "As children grow, their faith naturally matures. Our role is to provide a foundation that can support deeper understanding later. The roots of faith planted early will sustain the tree through the storms of later years."
        ],
        note: "Remember: Your child's faith journey is exactly that—a journey. There will be questions, doubts, and growth stages. Don't pressure for premature certainty; instead, create space for authentic exploration."
      }
    ],
    reflectionQuestions: [
      "What spiritual impressions are your children receiving from your home environment?",
      "How can you make faith more tangible and sensory for your young children?",
      "What spiritual routines could you establish to create consistency?",
      "How can you better understand and adapt to your child's developmental stage in spiritual matters?"
    ],
    prayerPrompt: "Dear Lord, thank You for the precious gift of young children and their receptive hearts. Help me to be faithful in planting seeds of faith during these impressionable years. Give me wisdom to create an environment where faith can flourish. Amen.",
    keyWords: [
      { word: "Receptivity", definition: "Openness and readiness to receive and accept new ideas or impressions." },
      { word: "Concrete Thinking", definition: "Understanding based on tangible, observable facts rather than abstract concepts." },
      { word: "Spiritual Environment", definition: "The atmosphere, practices, and influences that shape a child's spiritual development." }
    ],
    application: [
      "Establish one new spiritual routine this week (e.g., bedtime prayer, morning Bible story).",
      "Create a 'God is Good' chart and add one blessing each day with your child.",
      "Use a walk outdoors to point out evidence of God's creativity and care."
    ],
    parentChildActivity: "Make a 'God Loves Me' collage. Cut out pictures of things God made (sun, flowers, animals) and things you're thankful for. Glue them together and talk about how God's love is shown in His creation.",
    audioFile: "/audio/parenting/lesson5.mp3"
  },
  6: {
    id: 6,
    title: "Encouraging Positive Attitude Toward Scripture",
    subtitle: "Making the Bible come alive",
    introduction: "The Bible is not merely a book to be studied—it is a living message from God. Helping children develop a love for Scripture sets them on a path of lifelong faith. When children discover the Bible as relevant, exciting, and personally meaningful, it becomes a treasure they'll never leave.",
    memoryVerse: "2 Timothy 3:15 (NKJV) — 'From childhood you have known the Holy Scriptures, which are able to make you wise for salvation through faith which is in Christ Jesus.'",
    sections: [
      {
        title: "Making the Bible Relevant",
        content: [
          "For children to love the Bible, they need to see its relevance to their lives. The stories aren't just ancient history—they're about real people facing real challenges, and God's principles apply to the situations children face today.",
          "When reading Bible stories, help children connect to the characters. 'Have you ever felt afraid like David?' 'Do you ever find it hard to be kind like Ruth?' These connections make the Bible personal.",
          "Show children that the Bible speaks to their questions, fears, and joys. When they face challenges, ask, 'What does the Bible say about this?' Help them discover that God's Word is practical and timely."
        ],
        scripture: "Psalm 119:105 — 'Your word is a lamp to my feet and a light to my path.'"
      },
      {
        title: "Creative Bible Engagement",
        content: [
          "Children engage with Scripture through multiple senses. Reading is important, but so is acting out stories, drawing scenes, singing songs based on verses, and memorizing through games and movement.",
          "Consider using different approaches: picture Bibles for young children, Bible story videos, audio Bibles for car rides, and family Bible reading with discussion. Variety keeps engagement high.",
          "Encourage children to ask questions about the Bible. 'Why did God do that?' 'What does this verse mean?' Questions aren't signs of doubt but of engagement. Help them find answers together."
        ],
        quote: {
          text: "The Bible is God's voice speaking to us, just as surely as if we could hear it with our ears. If we realize this, with what awe we would open God's Word and with what earnestness search its precepts!",
          author: "Ellen G. White, The Adventist Home, p. 197"
        }
      },
      {
        title: "Modeling Love for Scripture",
        content: [
          "Children learn to value what their parents value. When they see us reading the Bible, memorizing verses, and turning to Scripture for guidance, they learn that God's Word is important and relevant.",
          "Let your children see you reading your Bible. Share with them what you're learning. When you face decisions, talk aloud about what Scripture says. Your example speaks louder than your instructions.",
          "Create a culture where the Bible is central. Keep it visible, accessible, and used. Let it be the authority in your home—not just a book on a shelf."
        ],
        reflection: [
          "What messages about the Bible are you communicating through your example?",
          "How can you make Bible engagement more creative and multi-sensory for your children?",
          "What would help your children see the Bible as relevant to their daily lives?"
        ]
      }
    ],
    reflectionQuestions: [
      "How does your personal Bible reading influence your children's view of Scripture?",
      "What creative methods could you use to make Bible stories come alive for your children?",
      "How do you respond when your children ask difficult questions about the Bible?",
      "What one change could make the Bible more central in your home?"
    ],
    prayerPrompt: "Lord, help me to love Your Word so deeply that it overflows into my children's lives. Give me creativity to make Scripture come alive for them. Let them discover the Bible as a treasure that guides, comforts, and transforms. Amen.",
    keyWords: [
      { word: "Relevance", definition: "The quality of being connected to and useful for current life situations." },
      { word: "Engagement", definition: "Active involvement and participation rather than passive reception." },
      { word: "Modeling", definition: "Demonstrating values and behaviors that children learn to imitate." }
    ],
    application: [
      "Share something you learned from your personal Bible reading with your child this week.",
      "Choose one Bible story to act out together as a family.",
      "Help your child memorize a new verse using a creative method (song, motions, drawing)."
    ],
    parentChildActivity: "Create a 'Bible Adventure Box.' Decorate a box together and fill it with props for acting out favorite Bible stories. Let your child choose a story, gather props, and 'perform' it for the family.",
    audioFile: "/audio/parenting/lesson6.mp3"
  },
  7: {
    id: 7,
    title: "Family Worship and Prayer",
    subtitle: "Building spiritual heritage",
    introduction: "Family worship is the heartbeat of a godly home. It's not merely a duty to be performed but a privilege to be treasured. Regular times of family prayer, Bible reading, and worship create spiritual traditions that bless generations.",
    memoryVerse: "Deuteronomy 6:7 (NKJV) — 'You shall teach them diligently to your children, and shall talk of them when you sit in your house.'",
    sections: [
      {
        title: "The Heart of Family Worship",
        content: [
          "Family worship is about relationship, not ritual. Its purpose isn't to check a box but to connect hearts—children with parents, and the whole family with God. When worship becomes a genuine time of connection, it becomes something everyone anticipates rather than endures.",
          "Effective family worship adapts to the ages and attention spans of children. For young children, five to ten minutes of active, engaging worship may be more meaningful than thirty minutes of sitting still.",
          "The key is consistency. Short, regular times of worship build habits and memories. Missed days are inevitable, but the pattern of coming together before God creates spiritual stability."
        ],
        scripture: "Joel 1:3 — 'Tell your children about it, let your children tell their children, and their children another generation.'"
      },
      {
        title: "Making Worship Engaging",
        content: [
          "Children engage best when worship includes variety and participation. Include singing (with motions for young children), Bible reading (with visual aids or acting out), prayer (with opportunities for children to pray), and sharing (what God has done, prayer requests).",
          "Let children participate in leading worship as they grow. Older children can read Scripture, choose songs, or share what they're learning. Participation creates ownership.",
          "Create traditions that make worship special. Light a candle for worship time. Use a special worship Bible. Keep a family prayer journal. These small touches signal that this time matters."
        ],
        quote: {
          text: "The father is the priest of the household. He should gather his family around him and read God's Word and teach them the way of salvation.",
          author: "Ellen G. White, The Adventist Home, p. 211"
        }
      },
      {
        title: "Prayer as Family Conversation",
        content: [
          "Family prayer teaches children that prayer is conversation with God—not a formal performance. When we pray naturally, conversationally, and honestly, children learn to approach God with confidence.",
          "Include children's prayer requests. When they see prayers answered, their faith grows. Keep a prayer journal to record requests and answers, celebrating together when God responds.",
          "Model praying Scripture, praying for others, and praying through struggles. Let children hear you thank God for daily provisions, ask for wisdom, and confess when you've failed. Authentic prayer teaches that God is present in all of life."
        ],
        reflection: [
          "What does your family worship time communicate about God's importance in your home?",
          "How can you make worship more engaging for your children's ages and personalities?",
          "What traditions could you establish to make family worship special and anticipated?"
        ]
      }
    ],
    reflectionQuestions: [
      "What is your current family worship practice? What works well? What needs adjustment?",
      "How do your children participate in family worship?",
      "What does your prayer life as a family teach your children about relating to God?",
      "How can you make family worship a priority despite busy schedules?"
    ],
    prayerPrompt: "Heavenly Father, help us to build family worship that honors You and connects our hearts. Give us creativity to make it engaging, consistency to make it lasting, and authenticity that draws us closer to You and each other. Amen.",
    keyWords: [
      { word: "Family Worship", definition: "Regular time set aside for a family to gather for Bible reading, prayer, and spiritual connection." },
      { word: "Spiritual Heritage", definition: "The faith, values, and traditions passed down through generations." },
      { word: "Intercessory Prayer", definition: "Praying on behalf of others; bringing the needs of others before God." }
    ],
    application: [
      "Establish a consistent time for family worship this week.",
      "Let each family member share one prayer request and pray for one another.",
      "Create a family prayer journal to record requests and answers."
    ],
    parentChildActivity: "Make a 'Family Prayer Box.' Decorate a box and fill it with slips of paper for prayer requests. Each day, draw one request to pray for together. Watch for answered prayers and celebrate them as a family!",
    audioFile: "/audio/parenting/lesson7.mp3"
  },
  8: {
    id: 8,
    title: "Sabbath: The Day of Delight",
    subtitle: "A special gift for families",
    introduction: "The Sabbath is God's special gift to families—a weekly opportunity to rest, reconnect, and rejoice together. When we reclaim the Sabbath as a day of delight rather than restriction, it becomes the highlight of the week for our children and a foundation for their faith.",
    memoryVerse: "Isaiah 58:13-14 (NKJV) — 'If you turn away your foot from the Sabbath, from doing your pleasure on My holy day, and call the Sabbath a delight, the holy day of the LORD honorable... then you shall delight yourself in the LORD.'",
    sections: [
      {
        title: "Sabbath as a Gift",
        content: [
          "Jesus taught that 'the Sabbath was made for man, not man for the Sabbath' (Mark 2:27). God gave the Sabbath as a gift—a day of rest, refreshment, and relationship. When we present Sabbath positively to children, they learn to anticipate it rather than dread it.",
          "The Sabbath is family time. In our busy world, it's easy to go in different directions. Sabbath provides a weekly reset—a day to be together without the pressures of work, school, and other obligations.",
          "Children experience Sabbath through what they see and do. If Sabbath feels like a list of prohibitions, they'll resist it. If it's filled with special activities and family connections, they'll embrace it."
        ],
        scripture: "Mark 2:27 — 'The Sabbath was made for man, and not man for the Sabbath.'"
      },
      {
        title: "Making Sabbath Special",
        content: [
          "Children need to see and experience that Sabbath is different from other days—but different in positive ways. Special meals, family activities, nature walks, and unhurried time together create positive associations.",
          "Prepare for Sabbath ahead of time so Friday evening is peaceful rather than frantic. Involve children in Sabbath preparation—cleaning, cooking, planning. Anticipation builds excitement.",
          "Sabbath traditions become cherished memories: special music, Sabbath walks, visiting elderly church members, family worship with extra time, Sabbath afternoon reading together. These traditions shape children's lifelong view of Sabbath."
        ],
        quote: {
          text: "The Sabbath should be made so interesting to our families that its weekly return will be hailed with joy. Parents can and should give their children a variety of innocent amusements upon the Sabbath.",
          author: "Ellen G. White, The Adventist Home, p. 287"
        }
      },
      {
        title: "Sabbath and the Church Community",
        content: [
          "Church attendance is part of honoring the Sabbath, but for children, it shouldn't be the entire Sabbath experience. Balance formal worship with family time, rest, and recreation that honors God's design for the day.",
          "Help children connect with church friends on Sabbath. These relationships reinforce that Sabbath is a day of community as well as family.",
          "As children grow, involve them in church activities. Let them participate in children's programs, learn special music, or help with younger children. Involvement creates ownership and investment in the church community."
        ],
        note: "Remember: Your attitude toward Sabbath is contagious. If you view it as a blessing, your children will too. If you see it as restrictive, they'll adopt that perspective."
      }
    ],
    reflectionQuestions: [
      "How do your children experience Sabbath? Is it a day they anticipate or endure?",
      "What Sabbath traditions from your childhood do you want to pass on? What new traditions could you create?",
      "How can you better prepare for Sabbath to minimize stress and maximize blessing?",
      "What activities make Sabbath special and memorable for your family?"
    ],
    prayerPrompt: "Lord, help our family to discover the Sabbath as a delight. Give us creativity to make it special and meaningful for our children. Let this weekly gift become a foundation for their faith and a source of joy for generations. Amen.",
    keyWords: [
      { word: "Delight", definition: "Great pleasure and joy; something that brings happiness." },
      { word: "Sabbath Traditions", definition: "Regular practices that make the Sabbath distinct and meaningful." },
      { word: "Preparation", definition: "Advance planning and activity that ensures Sabbath can be peaceful and focused." }
    ],
    application: [
      "Plan one new activity this Sabbath that your family will look forward to.",
      "Involve your children in Sabbath preparation this Friday.",
      "Share with your children why you love the Sabbath and what it means to you."
    ],
    parentChildActivity: "Plan a 'Sabbath Scavenger Hunt' for Sabbath afternoon. Create a list of nature items to find (a special leaf, a bird, a cloud shape) and talk about how God rested after creating the world and invites us to rest too.",
    audioFile: "/audio/parenting/lesson8.mp3"
  },
  9: {
    id: 9,
    title: "The Church and the Child",
    subtitle: "Partnering for spiritual growth",
    introduction: "God never intended parents to raise children in isolation. The church community is a vital partner in nurturing young faith. When parents and church work together, children benefit from a network of loving relationships and a broader experience of God's family.",
    memoryVerse: "Ephesians 4:12 (NKJV) — 'For the equipping of the saints for the work of ministry, for the edifying of the body of Christ.'",
    sections: [
      {
        title: "The Church as Extended Family",
        content: [
          "In God's design, the church is a family. Children need more than just their parents—they need a community of believers who love them, invest in them, and model faith in diverse ways. This extended family provides support, accountability, and reinforcement of what's taught at home.",
          "The early church understood this intergenerational connection. Paul encouraged older women to mentor younger women, and the faith was passed on through relationships that crossed age boundaries.",
          "When children have multiple adults who care about their spiritual growth, they see that faith isn't just a family tradition but a community reality."
        ],
        scripture: "Titus 2:3-4 — 'The older women likewise... admonish the young women to love their husbands, to love their children.'"
      },
      {
        title: "Choosing a Spiritual Community",
        content: [
          "Not all church environments equally support family discipleship. Look for a church where children are valued, not merely tolerated. Where families worship together, not just in separate programs. Where intergenerational relationships are encouraged.",
          "Evaluate the children's ministries: Do they partner with parents or replace them? Do they reinforce what's taught at home? Do they provide opportunities for children to serve and participate?",
          "Your choice of church community shapes your children's perception of God's family. Choose a community where they can belong, contribute, and grow."
        ],
        quote: {
          text: "The church is to be the family of God. In it the children are to be trained and educated in the things of the Lord.",
          author: "Ellen G. White, The Adventist Home, p. 321"
        }
      },
      {
        title: "Partnering with Church Leaders",
        content: [
          "Effective partnership with church leaders requires communication and collaboration. Let your child's teachers and leaders know what you're teaching at home so they can reinforce it. Share your child's needs, struggles, and questions.",
          "Support the church's ministry to children by volunteering, praying for leaders, and participating in family events. When children see parents serving the church, they learn that faith involves contribution, not just consumption.",
          "Don't outsource spiritual training to the church. The church is a supplement to, not a substitute for, the home. The primary responsibility remains with parents."
        ],
        reflection: [
          "How is your church partnering with you in raising your children?",
          "What could you do to strengthen the connection between your home and church?",
          "How do your children experience the church as a loving extended family?"
        ]
      }
    ],
    reflectionQuestions: [
      "What messages about the church are your children receiving from you?",
      "How can you help your children build meaningful relationships with other adults in the church?",
      "In what ways could you be more involved in the church's ministry to children?",
      "What conversations would strengthen partnership between your home and church?"
    ],
    prayerPrompt: "Father, thank You for the gift of Your family—the church. Help us to be fully part of this community and to raise our children within it. Give us wisdom to partner effectively with church leaders for the spiritual growth of our children. Amen.",
    keyWords: [
      { word: "Intergenerational", definition: "Involving and connecting multiple generations within a community." },
      { word: "Partnership", definition: "Collaborative relationship where each contributes to shared goals." },
      { word: "Community", definition: "A group of people who share relationships, values, and support." }
    ],
    application: [
      "Connect with one church leader this week to share how you're supporting your child's faith at home.",
      "Volunteer in a children's ministry area at your church.",
      "Invite another family from church to share a meal or activity with your family."
    ],
    parentChildActivity: "Attend a church social or potluck together. Help your child talk with at least three adults, asking them about their favorite Bible story or how they came to love Jesus. Show that church is a family of friends!",
    audioFile: "/audio/parenting/lesson9.mp3"
  },
  10: {
    id: 10,
    title: "Confronting the World (Part 1): Choosing Companions and Influences",
    subtitle: "Guiding children in friendship choices",
    introduction: "Friendships profoundly shape our children's character and values. As parents, we must guide them in choosing companions who will influence them toward righteousness, while equipping them to be positive influences themselves. This delicate balance requires wisdom, prayer, and intentional relationship.",
    memoryVerse: "1 Corinthians 15:33 (NKJV) — 'Do not be deceived: Evil company corrupts good habits.'",
    sections: [
      {
        title: "The Power of Influence",
        content: [
          "Scripture is clear about the power of companionship. Friends shape our thinking, behavior, and values—often more than we realize. For children and teens, peer influence can be particularly powerful as they seek acceptance and identity.",
          "The principle isn't isolation but discernment. We don't keep our children from the world entirely—Jesus prayed that we would be in the world but not of it. Instead, we help them develop wisdom in choosing friends who will encourage their faith.",
          "The goal is not to control every friendship but to equip children to recognize healthy influences and to develop the courage to choose friends wisely."
        ],
        scripture: "Proverbs 13:20 — 'He who walks with wise men will be wise, but the companion of fools will be destroyed.'"
      },
      {
        title: "Building Healthy Friendships",
        content: [
          "The best protection against negative peer pressure is positive relationships. Help your children build friendships with peers who share your values. This doesn't mean excluding others, but intentionally cultivating relationships that will encourage spiritual growth.",
          "Create opportunities for positive friendships through church activities, family gatherings, and shared interests. Know your children's friends and their families. Host gatherings that allow you to observe and influence peer interactions.",
          "Teach children what to look for in a friend: shared values, mutual respect, encouragement toward good choices, and the ability to disagree respectfully. Help them evaluate friendships based on how they're influenced, not just on popularity."
        ],
        quote: {
          text: "The company our children keep is a matter of great importance. They should be encouraged to form friendships with those who will help them in the right way.",
          author: "Ellen G. White, The Adventist Home, p. 404"
        }
      },
      {
        title: "Navigating Challenging Friendships",
        content: [
          "Sometimes our children are drawn to friendships that concern us. When this happens, resist the urge to forbid the friendship outright, which may drive it underground. Instead, stay connected, set appropriate boundaries, and use the situation as a teaching opportunity.",
          "Set clear expectations about where, when, and how often your child can spend time with friends who concern you. Use your home as a gathering place where you can provide supervision and positive influence.",
          "Help your child evaluate the friendship: 'How do you feel after spending time with this friend?' 'Does this friend help you make good choices?' 'What do you admire about this friend? What concerns you?'"
        ],
        note: "Remember: Your relationship with your child is the most powerful influence in their life. Stay connected, listen without judgment, and keep communication open. A strong parent-child relationship is the best protection against negative peer influence."
      }
    ],
    reflectionQuestions: [
      "Who are your children's closest friends? What do you know about these friendships?",
      "How are you helping your children choose friends wisely?",
      "What opportunities do you create for positive friendships?",
      "How do you handle situations when your child is drawn to concerning friendships?"
    ],
    prayerPrompt: "Lord, give me wisdom as I guide my children in choosing friends. Help me to be a safe place for them to share their relationships. Protect them from harmful influences and give them the courage to choose friends who will encourage their faith. Amen.",
    keyWords: [
      { word: "Peer Pressure", definition: "Influence from members of one's peer group to adopt certain behaviors or values." },
      { word: "Discernment", definition: "The ability to judge well; wisdom in making distinctions." },
      { word: "Influence", definition: "The capacity to have an effect on character, development, or behavior." }
    ],
    application: [
      "Get to know your child's friends by inviting them to your home.",
      "Talk with your child about what makes a good friend.",
      "Help your child identify one friendship that encourages spiritual growth."
    ],
    parentChildActivity: "Play the 'Friend Detective' game. Ask your child to describe their ideal friend's character traits (kind, honest, fun). Then talk about which of their current friends have these traits. Celebrate the good friendships they have!",
    audioFile: "/audio/parenting/lesson10.mp3"
  },
  11: {
    id: 11,
    title: "Confronting the World (Part 2): Recreation and Media",
    subtitle: "Navigating entertainment and amusements",
    introduction: "In a media-saturated world, parents face unprecedented challenges in guiding children toward wholesome entertainment. Our choices about recreation and media shape our children's minds, values, and spiritual development. With wisdom and intentionality, we can help them develop discernment that lasts a lifetime.",
    memoryVerse: "Philippians 4:8-9 (NKJV) — 'Finally, brethren, whatever things are true, whatever things are noble, whatever things are just, whatever things are pure, whatever things are lovely, whatever things are of good report... meditate on these things.'",
    sections: [
      {
        title: "The Power of Media",
        content: [
          "Media isn't neutral—it shapes our thinking, values, and desires. What we watch, listen to, and consume influences our spiritual condition. For children, whose minds are forming and values are developing, this influence is particularly powerful.",
          "Research shows that media exposure affects everything from attention span to moral reasoning to views of relationships. What children consume shapes who they become.",
          "This doesn't mean all media is bad. Quality media can educate, inspire, and entertain. But it does mean we must be intentional gatekeepers, not passive consumers."
        ],
        scripture: "Psalm 101:3 — 'I will set nothing wicked before my eyes.'"
      },
      {
        title: "Creating a Media Strategy",
        content: [
          "Rather than reacting to each media choice, develop a family media strategy. Set clear guidelines about what's acceptable and why. Establish boundaries about when and where media can be used. Model these boundaries yourself.",
          "Consider using media together when possible. Co-viewing allows you to discuss content, ask questions, and provide perspective. It also helps you understand what your children are consuming.",
          "Teach children to evaluate media based on biblical principles. Questions to ask: Does this honor God? Does it reflect biblical values? Does it lead my thoughts toward what's pure and true? Does it respect others? Does it strengthen my faith?"
        ],
        quote: {
          text: "We should not patronize any amusement that will unfit us for the work of God. We should choose such recreations as will bring peace and happiness and will develop the physical and mental powers.",
          author: "Ellen G. White, The Adventist Home, p. 412"
        }
      },
      {
        title: "Alternatives to Media",
        content: [
          "Simply restricting media isn't enough—we must also provide appealing alternatives. Help children discover wholesome recreation that engages body, mind, and spirit. Outdoor activities, creative projects, family games, and service opportunities can become more compelling than screens.",
          "Model these alternatives yourself. When children see you choosing reading over scrolling, walking over watching, creating over consuming, they learn that life offers richer pleasures than media.",
          "Create family traditions that don't involve screens—hiking, cooking together, board games, music-making, gardening. These activities build connection and create lasting memories."
        ],
        reflection: [
          "What media influences are shaping your children's thinking and values?",
          "How can you help your children develop discernment in media choices?",
          "What alternatives to media could you introduce that would engage your family positively?"
        ]
      }
    ],
    reflectionQuestions: [
      "What's your family's current media consumption? What patterns need attention?",
      "How do you teach your children to evaluate media based on biblical principles?",
      "What creative alternatives to screen time could you introduce?",
      "How does your own media consumption model what you want your children to learn?"
    ],
    prayerPrompt: "Heavenly Father, give us wisdom to guide our children through a media-saturated world. Help us to set healthy boundaries, teach discernment, and provide appealing alternatives. Protect their minds and hearts from what would harm their faith. Amen.",
    keyWords: [
      { word: "Discernment", definition: "The ability to judge well; spiritual wisdom in making choices." },
      { word: "Gatekeeper", definition: "One who controls access to influences and experiences." },
      { word: "Wholesome Recreation", definition: "Activities that refresh body, mind, and spirit in positive ways." }
    ],
    application: [
      "Review your family's media consumption this week and identify one area to adjust.",
      "Co-view a program with your child and discuss it using biblical principles.",
      "Introduce one new screen-free family activity this week."
    ],
    parentChildActivity: "Create a 'Media Menu' together. List favorite media options in categories (always allowed, sometimes with permission, not allowed). Include reasons for each category. Post it as your family's media guide.",
    audioFile: "/audio/parenting/lesson11.mp3"
  },
  12: {
    id: 12,
    title: "The Child's Education",
    subtitle: "True education for eternity",
    introduction: "True education encompasses far more than academics—it's the development of the whole person for service to God. As parents, we have the privilege and responsibility to guide our children's education, whether we choose homeschooling, church school, or public education with intentional supplementation. Our goal is not merely success in this life but preparation for eternity.",
    memoryVerse: "Proverbs 1:7 (NKJV) — 'The fear of the LORD is the beginning of knowledge, but fools despise wisdom and instruction.'",
    sections: [
      {
        title: "The True Purpose of Education",
        content: [
          "Education isn't just about acquiring information or skills—it's about shaping character, developing wisdom, and preparing for service. True education, as Scripture defines it, begins with the fear of the Lord and leads to transformed living.",
          "Ellen White wrote that true education 'means more than the pursuit of a certain course of study. It means the harmonious development of the physical, the mental, and the spiritual powers.' Education prepares children for the joy of service in this life and for the higher work of eternity.",
          "Whatever educational choices we make, this broader vision must guide our decisions and our involvement in our children's education."
        ],
        scripture: "Isaiah 54:13 — 'All your children shall be taught by the LORD, and great shall be the peace of your children.'"
      },
      {
        title: "Parents as Primary Educators",
        content: [
          "Even when we delegate some education to schools, parents remain the primary educators. The hours children spend in school are limited compared to the hours they spend at home. What happens outside school—the conversations, values, habits, and experiences—shapes them as much as curriculum.",
          "Be intentionally involved in your children's education. Know what they're learning. Supplement and reinforce biblical perspectives. Use everyday experiences as teaching moments about God's world and ways.",
          "The home should be the first school—and continuing school—for children. Here they learn the most important lessons: character, faith, relationships, and the practical skills of life."
        ],
        quote: {
          text: "The home is the first school, and the parents are the first teachers. In the home the foundation is laid for the education that is to continue through life.",
          author: "Ellen G. White, The Adventist Home, p. 181"
        }
      },
      {
        title: "Making Educational Choices",
        content: [
          "Families make different educational choices based on their circumstances and convictions. There's no one-size-fits-all prescription. What matters is intentionality—making choices prayerfully, with your child's needs and your family's values in mind.",
          "If you choose public education, commit to being highly involved. Know what's being taught, build relationships with teachers, and intentionally supplement biblical perspectives at home.",
          "If you choose church school, support the school through involvement and prayer, but remember that your home remains the primary influence.",
          "If you choose homeschooling, find community for support and accountability, and ensure your children have opportunities for healthy socialization and diverse perspectives.",
          "Whatever you choose, remember: God is faithful to guide. Seek His wisdom, and trust Him to work through your intentional efforts."
        ],
        note: "Remember: No educational choice is perfect because no human institution is perfect. Trust God to guide you to the choice that's best for your family, and then commit to being actively involved in your children's spiritual and academic growth."
      }
    ],
    reflectionQuestions: [
      "What educational choices has your family made? What led to those choices?",
      "How are you staying involved in your children's education, whatever form it takes?",
      "What are you doing to ensure education includes development of the whole person—physical, mental, and spiritual?",
      "How can your home be a stronger educational environment, regardless of school choice?"
    ],
    prayerPrompt: "Lord, guide us as we make educational choices for our children. Help us to keep the true purpose of education in view—preparing our children for service to You. Give us wisdom to be actively involved in their learning and to create a home where true education flourishes. Amen.",
    keyWords: [
      { word: "True Education", definition: "The harmonious development of physical, mental, and spiritual powers for service to God and others." },
      { word: "Disciple", definition: "A learner or follower; one who is being shaped by teaching and example." },
      { word: "Stewardship", definition: "The responsible management of resources—including educational opportunities—for God's purposes." }
    ],
    application: [
      "Talk with your children about why education matters beyond getting good grades.",
      "Identify one way you can be more involved in your child's education this week.",
      "Create a 'Learning Together' activity—cook together, garden, visit a museum—that connects learning to faith."
    ],
    parentChildActivity: "Create a 'Learning Is for Life' poster together. Add pictures of things your family has learned (riding a bike, reading, cooking) and things you want to learn. Talk about how learning helps us serve God and others better.",
    audioFile: "/audio/parenting/lesson12.mp3"
  }
};