// app/group/[groupId]/study-hub/discover/lessonData.ts
export const discoverData: Record<number, any> = {
  // ==================== SANCTUARY SERIES (Lessons 1-9) ====================
  1: {
    id: 1,
    title: "What is Jesus Doing Today?",
    subtitle: "Our High Priest in Heaven",
    introduction: "Jesus is not idle in heaven. He is actively ministering as our High Priest, interceding for us and preparing for His return. The sanctuary in heaven is where Jesus is working on our behalf right now.",
    memoryVerse: "Hebrews 8:1 - 'We have such a High Priest, who is seated at the right hand of the throne of the Majesty in the heavens.'",
    sections: [
      {
        title: "Where is Jesus Today?",
        content: [
          "Jesus is not on earth—He ascended to heaven and is seated at the right hand of God the Father.",
          "He is not in an earthly sanctuary—He ministers in the heavenly sanctuary.",
          "His position is one of honor, authority, and active ministry on our behalf."
        ],
        scripture: "Mark 16:19, Acts 2:33, Colossians 3:1, Hebrews 10:12"
      },
      {
        title: "What is Jesus Doing?",
        content: [
          "Jesus is our High Priest—He represents us before the Father.",
          "He is our Mediator—He brings God and humanity together.",
          "He is our Advocate—He defends us against Satan's accusations.",
          "He is our Intercessor—He prays for us continually."
        ],
        scripture: "Acts 5:31, Romans 8:34, Hebrews 7:25, 1 John 2:1"
      },
      {
        title: "Diagram: Christ's Heavenly Ministry",
        content: [
          "",
          "  ┌─────────────────────────────────────────────────────────────┐",
          "  │                    HEAVENLY SANCTUARY                       │",
          "  ├─────────────────────────┬───────────────────────────────────┤",
          "  │                         │                                   │",
          "  │    HOLY PLACE           │      MOST HOLY PLACE              │",
          "  │    (AD 31 - 1844)       │      (1844 - Present)             │",
          "  │                         │                                   │",
          "  │    • Daily Intercession │      • Investigative Judgment     │",
          "  │    • Forgiveness        │      • Blotting out of sins       │",
          "  │    • Mercy for sinners  │      • Final atonement            │",
          "  │                         │                                   │",
          "  └─────────────────────────┴───────────────────────────────────┘",
          "",
          "Jesus moved from the Holy Place to the Most Holy Place in 1844."
        ],
        scripture: "Hebrews 9:24"
      },
      {
        title: "What is Righteousness?",
        content: [
          "Righteousness is right-doing—conformity to God's law and character.",
          "It is also the gift God gives us through faith in Christ.",
          "We cannot earn righteousness—it is imputed (credited) to us through faith."
        ],
        scripture: "Psalm 48:10, Isaiah 41:10, Romans 3:22, Romans 4:22-24"
      },
      {
        title: "Our Part",
        content: [
          "We confess our sins—agreeing with God about our wrongdoing.",
          "We repent—turning away from sin and toward God.",
          "We receive His forgiveness—by faith, not by feelings."
        ],
        scripture: "1 John 1:9, 2 Corinthians 7:10"
      },
      {
        title: "The Judgment is Good News",
        content: [
          "Many people fear the judgment, but for believers, it's good news.",
          "The judgment vindicates God's people—showing that God's judgments are just.",
          "It demonstrates to the universe that God has been fair with everyone."
        ],
        scripture: "Daniel 7:22, Romans 2:5-11"
      }
    ],
    reflectionQuestions: [
      "Where exactly is Jesus today in heaven?",
      "What is Jesus doing as our High Priest?",
      "What is righteousness?",
      "How does His intercession affect my daily life?",
      "Why is the judgment good news?"
    ],
    prayerPrompt: "Lord Jesus, thank You for ministering for me in heaven. Thank You for being my High Priest, my Mediator, and my Advocate. Help me to confess my sins and receive Your forgiveness. Amen.",
    keyWords: [
      { word: "High Priest", definition: "Jesus—our representative before God" },
      { word: "Mediator", definition: "The one who brings God and humanity together" },
      { word: "Advocate", definition: "Our defense attorney in the judgment" },
      { word: "Intercessor", definition: "One who prays on behalf of others" }
    ],
    application: [
      "Confess your sins daily—Jesus is your Advocate",
      "Trust His intercession, not your own goodness",
      "Look forward to the judgment with confidence"
    ],
    audioFile: "/audio/discover/lesson1.mp3"
  },
  2: {
    id: 2,
    title: "Sanctuary Elements - The Outer Court",
    subtitle: "Justification: Being Made Right with God",
    introduction: "The outer court of the sanctuary contained the Brazen Altar and the Laver. These elements teach us about justification—how we are forgiven and cleansed from sin.",
    memoryVerse: "Psalm 77:13 - 'Your way, O God, is in the sanctuary.'",
    sections: [
      {
        title: "The Brazen Altar",
        content: [
          "The brazen altar was the first object the sinner encountered when entering the sanctuary court.",
          "It was made of acacia wood (humanity) overlaid with bronze (judgment).",
          "On this altar, animals were sacrificed—representing the death of Jesus for our sins."
        ],
        scripture: "Exodus 27:1-8, Leviticus 1:3-9",
        illustration: "brazen_altar_diagram"
      },
      {
        title: "Diagram: The Brazen Altar",
        content: [
          "",
          "                    ┌─────────────────┐",
          "                    │                 │",
          "                    │    HORN ┌───┐   │",
          "                    │         │   │   │",
          "                    │    ┌────┴───┴────┐",
          "                    │    │             │",
          "                    │    │    FIRE     │",
          "                    │    │             │",
          "                    │    └────┬───┬────┘",
          "                    │         │   │   │",
          "                    │    HORN └───┘   │",
          "                    │                 │",
          "                    └─────────────────┘",
          "",
          "The altar represents the cross of Christ.",
          "The fire represents God's judgment on sin.",
          "The horns represent the power of the blood to save.",
          "The bronze represents judgment—our sins judged on Jesus."
        ],
        scripture: "Hebrews 13:10-12"
      },
      {
        title: "The Laver",
        content: [
          "The laver was a large bronze basin filled with water.",
          "It was made from the mirrors of the women—representing self-examination.",
          "The priests washed their hands and feet before serving—representing cleansing from sin."
        ],
        scripture: "Exodus 30:17-21, Exodus 38:8",
        illustration: "laver_diagram"
      },
      {
        title: "Diagram: The Laver",
        content: [
          "",
          "                    ┌─────────────────┐",
          "                    │                 │",
          "                    │    ┌───────┐    │",
          "                    │    │       │    │",
          "                    │    │ WATER │    │",
          "                    │    │       │    │",
          "                    │    └───────┘    │",
          "                    │                 │",
          "                    │    ┌─────┐      │",
          "                    │    │STAND│      │",
          "                    │    └─────┘      │",
          "                    └─────────────────┘",
          "",
          "The laver represents baptism and the cleansing power of God's Word.",
          "The water represents the Word of God (Ephesians 5:26).",
          "The mirrors represent self-examination (James 1:23-25)."
        ],
        scripture: "Ephesians 5:26"
      },
      {
        title: "Justification Explained",
        content: [
          "Justification means being declared righteous—just as if I'd never sinned.",
          "It is a legal declaration by God that the sinner is forgiven and accepted.",
          "Justification is based on Christ's sacrifice, not our works.",
          "We receive justification by faith—trusting in what Christ has done."
        ],
        scripture: "Romans 3:24-28, Romans 5:1, Galatians 2:16"
      },
      {
        title: "The Sinner's Journey at the Altar",
        content: [
          "STEP 1: The sinner brought an unblemished lamb—representing Jesus.",
          "STEP 2: The sinner laid his hands on the lamb's head—confessing his sins.",
          "STEP 3: The sinner killed the lamb—recognizing his sin caused death.",
          "STEP 4: The priest caught the blood and took it into the sanctuary.",
          "STEP 5: The sinner was forgiven—justified by faith."
        ],
        scripture: "Leviticus 4:27-35"
      },
      {
        title: "The Laver and Baptism",
        content: [
          "After being justified at the altar, the priest washed at the laver.",
          "This represents baptism—the public declaration of faith.",
          "Baptism symbolizes death to the old life and resurrection to new life.",
          "It is the outward sign of the inward change."
        ],
        scripture: "Romans 6:3-4, Acts 22:16"
      }
    ],
    reflectionQuestions: [
      "What does the Brazen Altar teach us about sin?",
      "What does the Laver represent in the Christian life?",
      "How do we approach a holy God?",
      "What is justification, and how do we receive it?"
    ],
    prayerPrompt: "Lord, thank You for the brazen altar—the cross where You died for me. Thank You for the laver—washing me clean through Your Word and baptism. I receive Your justification by faith. Amen.",
    keyWords: [
      { word: "Brazen Altar", definition: "Symbol of the cross—where judgment and mercy meet" },
      { word: "Laver", definition: "Symbol of baptism and cleansing by God's Word" },
      { word: "Justification", definition: "Being declared righteous through faith in Christ" }
    ],
    application: [
      "Confess your sins—receive justification by faith",
      "Be baptized if you haven't been",
      "Let God's Word cleanse you daily"
    ],
    audioFile: "/audio/discover/lesson2.mp3"
  },
  3: {
    id: 3,
    title: "Sanctuary Elements - The Holy Place",
    subtitle: "Sanctification: Growing in Christ",
    introduction: "The holy place contained the Table of Showbread, the Lampstand, and the Altar of Incense. These teach us about sanctification—growing in Christ daily through His Word, the Holy Spirit, and prayer.",
    memoryVerse: "Psalm 77:13 - 'Your way, O God, is in the sanctuary.'",
    sections: [
      {
        title: "The Table of Showbread",
        content: [
          "The table held twelve loaves of bread, representing the twelve tribes of Israel.",
          "The bread was replaced every Sabbath—showing the need for fresh spiritual food daily.",
          "The bread represents the Word of God—our daily bread."
        ],
        scripture: "Exodus 25:23-30, Leviticus 24:5-9",
        illustration: "table_of_showbread_diagram"
      },
      {
        title: "Diagram: The Table of Showbread",
        content: [
          "",
          "                    ┌─────────────────┐",
          "                    │                 │",
          "                    │    ┌─────┐      │",
          "                    │    │     │      │",
          "                    │    │ 12  │      │",
          "                    │    │LOAVES│     │",
          "                    │    │     │      │",
          "                    │    └─────┘      │",
          "                    │                 │",
          "                    │    ┌─────┐      │",
          "                    │    │GOLD │      │",
          "                    │    │MOLDING│    │",
          "                    │    └─────┘      │",
          "                    └─────────────────┘",
          "",
          "The table represents Jesus—the Bread of Life (John 6:35).",
          "The 12 loaves represent all of God's people.",
          "The gold represents divinity—the Word of God is divine."
        ],
        scripture: "John 6:35"
      },
      {
        title: "The Golden Lampstand",
        content: [
          "The lampstand was made of pure gold, hammered from one piece.",
          "It had a central shaft with three branches on each side—seven lamps total.",
          "It burned pure olive oil—representing the Holy Spirit.",
          "It was the only source of light in the Holy Place."
        ],
        scripture: "Exodus 25:31-40, Exodus 27:20-21",
        illustration: "menorah_diagram"
      },
      {
        title: "Diagram: The Golden Lampstand",
        content: [
          "",
          "                         ┌─────┐",
          "                         │     │",
          "                    ┌────┴─────┴────┐",
          "                    │               │",
          "               ┌────┴───┐       ┌───┴────┐",
          "               │        │       │        │",
          "          ┌────┴───┐    │       │    ┌───┴────┐",
          "          │        │    │       │    │        │",
          "          │   🌟   │    │   🌟  │    │   🌟   │",
          "          │        │    │       │    │        │",
          "          └────────┘    └───┬───┘    └────────┘",
          "                           │",
          "                      ┌────┴────┐",
          "                      │  BASE   │",
          "                      └─────────┘",
          "",
          "The lampstand represents Jesus—the Light of the World (John 8:12).",
          "The olive oil represents the Holy Spirit (Zechariah 4:6).",
          "The seven lamps represent the seven churches (Revelation 1:20)."
        ],
        scripture: "John 8:12, Zechariah 4:6"
      },
      {
        title: "The Altar of Incense",
        content: [
          "The altar of incense stood before the veil leading to the Most Holy Place.",
          "Incense was burned morning and evening—representing prayer.",
          "The fire came from the brazen altar—prayer based on Christ's sacrifice."
        ],
        scripture: "Exodus 30:1-10, Psalm 141:2",
        illustration: "altar_of_incense_diagram"
      },
      {
        title: "Sanctification Explained",
        content: [
          "Sanctification means being made holy—set apart for God's purposes.",
          "It is the work of the Holy Spirit in our lives, transforming us into Christ's image.",
          "While justification is instantaneous, sanctification is a lifelong process.",
          "We cooperate with God's work by abiding in Christ and obeying His Word."
        ],
        scripture: "John 17:17, 2 Corinthians 3:18, 1 Thessalonians 4:3"
      },
      {
        title: "The Three Furnishings of the Holy Place",
        content: [
          "THE TABLE OF SHOWBREAD → The Word of God (John 6:35)",
          "THE GOLDEN LAMPSTAND → The Holy Spirit (John 16:13)",
          "THE ALTAR OF INCENSE → Prayer (Revelation 8:3-4)",
          "",
          "These three elements are essential for spiritual growth:",
          "• Feed on God's Word daily",
          "• Be filled with the Holy Spirit",
          "• Pray without ceasing"
        ],
        scripture: "John 6:35, John 16:13, Revelation 8:3-4"
      }
    ],
    reflectionQuestions: [
      "What does the Table of Showbread represent?",
      "What does the Lampstand symbolize?",
      "What does the Altar of Incense teach about prayer?",
      "What is sanctification, and how does it happen?"
    ],
    prayerPrompt: "Lord, help me to grow in sanctification. Feed me with Your Word daily. Fill me with Your Spirit. Teach me to pray without ceasing. Transform me into Your image. Amen.",
    keyWords: [
      { word: "Showbread", definition: "The Word of God—our daily bread" },
      { word: "Lampstand", definition: "The Holy Spirit—our source of light" },
      { word: "Incense", definition: "Prayer—ascending to God" },
      { word: "Sanctification", definition: "The process of becoming more like Christ" }
    ],
    application: [
      "Read your Bible daily—feed on the Showbread",
      "Ask the Holy Spirit to fill you—let the Lampstand shine",
      "Pray without ceasing—offer the Incense"
    ],
    audioFile: "/audio/discover/lesson3.mp3"
  },
  4: {
    id: 4,
    title: "Sanctuary Elements - The Most Holy Place",
    subtitle: "Glorification: Living in God's Presence",
    introduction: "The Most Holy Place contained the Ark of the Covenant with the Ten Commandments, the Mercy Seat, and the Shekinah glory. This teaches us about glorification—living in God's presence forever.",
    memoryVerse: "Hebrews 4:16 - 'Let us therefore come boldly to the throne of grace.'",
    sections: [
      {
        title: "The Ark of the Covenant",
        content: [
          "The Ark was a chest made of acacia wood overlaid with gold.",
          "It contained the Ten Commandments—the foundation of God's government.",
          "The Ark represented God's throne—where He dwelt between the cherubim."
        ],
        scripture: "Exodus 25:10-16, Deuteronomy 10:5",
        illustration: "ark_of_covenant_diagram"
      },
      {
        title: "Diagram: The Ark of the Covenant",
        content: [
          "",
          "                    ┌─────────────────┐",
          "                    │                 │",
          "                    │   CHERUBIM      │",
          "                    │                 │",
          "                    │   ┌───────┐     │",
          "                    │   │MERCY  │     │",
          "                    │   │ SEAT  │     │",
          "                    │   └───────┘     │",
          "                    │                 │",
          "                    │   ┌───────┐     │",
          "                    │   │  LAW  │     │",
          "                    │   └───────┘     │",
          "                    │                 │",
          "                    └─────────────────┘",
          "",
          "The Ark represents God's throne.",
          "The cherubim represent the angels who surround God's throne.",
          "The mercy seat represents the place of atonement.",
          "The law represents God's character and government."
        ],
        scripture: "Exodus 25:17-22"
      },
      {
        title: "The Mercy Seat",
        content: [
          "The mercy seat was the solid gold lid of the Ark.",
          "On the Day of Atonement, blood was sprinkled on the mercy seat.",
          "This was where mercy and justice met—God's law (justice) and His mercy."
        ],
        scripture: "Leviticus 16:14-15, Romans 3:25"
      },
      {
        title: "The Shekinah Glory",
        content: [
          "The Shekinah glory was the visible presence of God dwelling between the cherubim.",
          "It was so bright that the priests could not stand to minister.",
          "This represented God's character—His glory is His character (Exodus 33:18-19)."
        ],
        scripture: "Exodus 40:34-35, Exodus 33:18-19"
      },
      {
        title: "The Contents of the Ark",
        content: [
          "The Ten Commandments—the only item placed inside the Ark.",
          "A golden pot of manna—representing God's provision (placed before the Ark).",
          "Aaron's rod that budded—representing God's chosen priesthood (placed before the Ark)."
        ],
        scripture: "Hebrews 9:4"
      },
      {
        title: "Glorification Explained",
        content: [
          "Glorification is the final step of salvation—being made perfect and living with God forever.",
          "It happens at the resurrection when we receive new, immortal bodies.",
          "We will see God face to face and dwell in His presence eternally."
        ],
        scripture: "Romans 8:30, Philippians 3:20-21, 1 John 3:2"
      },
      {
        title: "The Journey Through the Sanctuary",
        content: [
          "OUTER COURT → Justification (forgiven)",
          "HOLY PLACE → Sanctification (being made holy)",
          "MOST HOLY PLACE → Glorification (made perfect)",
          "",
          "The sanctuary is a complete picture of salvation—from forgiveness to perfection."
        ],
        scripture: "Romans 8:30"
      }
    ],
    reflectionQuestions: [
      "What was inside the Ark of the Covenant?",
      "What does the mercy seat represent?",
      "What is the Shekinah glory?",
      "What is glorification, and when does it happen?"
    ],
    prayerPrompt: "Lord, thank You for the throne of grace. Help me to come boldly to receive mercy. Write Your law on my heart. Prepare me for the day when I will see You face to face. Amen.",
    keyWords: [
      { word: "Ark of the Covenant", definition: "God's throne—symbol of His presence" },
      { word: "Mercy Seat", definition: "The place where mercy and justice meet" },
      { word: "Shekinah", definition: "God's visible presence—His glory" },
      { word: "Glorification", definition: "Being made perfect and living with God forever" }
    ],
    application: [
      "Have God's law written on your heart",
      "Come boldly to the throne of grace",
      "Look forward to seeing God face to face"
    ],
    audioFile: "/audio/discover/lesson4.mp3"
  },
  5: {
    id: 5,
    title: "Christ the Lamb",
    subtitle: "The sacrifice for our sins",
    introduction: "Jesus is the Lamb of God who takes away the sin of the world. His sacrifice was perfect, spotless, and sufficient for all humanity. The sanctuary lamb pointed forward to Him.",
    memoryVerse: "John 1:29 - 'Behold the Lamb of God, who takes away the sin of the world!'",
    sections: [
      {
        title: "The Lamb in the Old Testament",
        content: [
          "From Genesis to Malachi, the lamb was central to worship.",
          "Abel offered a lamb (Genesis 4:4). Abraham was told to offer a lamb (Genesis 22:8).",
          "The Passover lamb saved Israel from death (Exodus 12).",
          "Every day, a lamb was offered in the sanctuary—pointing to the coming Messiah."
        ],
        scripture: "Genesis 4:4, Exodus 12:3-13, Isaiah 53:7"
      },
      {
        title: "The Requirements of the Lamb",
        content: [
          "The lamb had to be without blemish—representing the sinlessness of Christ.",
          "The lamb had to be male—representing Christ as the Son of God.",
          "The lamb had to be one year old—representing Christ in the prime of life.",
          "The lamb had to be willingly offered—representing Christ's voluntary sacrifice."
        ],
        scripture: "Exodus 12:5, 1 Peter 1:19, John 10:18"
      },
      {
        title: "Why a Lamb?",
        content: [
          "Lambs are gentle, innocent, and defenseless—representing Christ's character.",
          "Lambs were the most common sacrificial animal—showing God's provision for all.",
          "The lamb became the universal symbol of sacrifice and redemption."
        ],
        scripture: "Isaiah 53:7, John 1:29"
      },
      {
        title: "Jesus the Lamb of God",
        content: [
          "John the Baptist declared, 'Behold the Lamb of God!'",
          "Jesus was crucified during Passover—the time when lambs were sacrificed.",
          "He died as the perfect, spotless Lamb—once for all.",
          "His blood saves us from the second death."
        ],
        scripture: "John 1:29, 1 Corinthians 5:7, 1 Peter 1:18-19"
      },
      {
        title: "The Lamb in Revelation",
        content: [
          "In heaven, Jesus is still called the Lamb—reminding us of His sacrifice.",
          "The Lamb was slain from the foundation of the world—God's plan from the beginning.",
          "The Lamb is worthy to open the book and receive worship."
        ],
        scripture: "Revelation 5:6-12, Revelation 13:8"
      }
    ],
    reflectionQuestions: [
      "Why is Jesus called the Lamb?",
      "What does it mean that Jesus was 'slain from the foundation of the world'?",
      "How can we be like Jesus—unblemished?",
      "Why was the lamb the most common sacrifice?"
    ],
    prayerPrompt: "Lord Jesus, Lamb of God, thank You for taking away my sin. You are the perfect, spotless sacrifice. I worship You, the Lamb who was slain. Amen.",
    keyWords: [
      { word: "Lamb of God", definition: "Jesus—the perfect sacrifice for sin" },
      { word: "Unblemished", definition: "Without defect—sinless" },
      { word: "Passover", definition: "The feast commemorating deliverance from Egypt" }
    ],
    application: [
      "Thank Jesus for being your Lamb",
      "Live a life that honors His sacrifice",
      "Worship the Lamb who was slain"
    ],
    audioFile: "/audio/discover/lesson5.mp3"
  },
  6: {
    id: 6,
    title: "Christ the High Priest",
    subtitle: "Our mediator in heaven",
    introduction: "Jesus is not only the Lamb who died, but also the High Priest who lives to intercede for us. He presents His blood before the Father on our behalf.",
    memoryVerse: "Hebrews 4:14 - 'Seeing then that we have a great High Priest who has passed through the heavens, Jesus the Son of God.'",
    sections: [
      {
        title: "The Role of the High Priest",
        content: [
          "The high priest represented the people before God.",
          "He offered gifts and sacrifices for sins.",
          "He alone could enter the Most Holy Place on the Day of Atonement.",
          "He was the mediator between God and humanity."
        ],
        scripture: "Hebrews 5:1, Hebrews 8:3, Hebrews 9:7"
      },
      {
        title: "The Qualifications of a High Priest",
        content: [
          "Must be human—to represent humanity (Hebrews 2:14-17).",
          "Must be called by God—not self-appointed (Hebrews 5:4-5).",
          "Must sympathize with sinners—able to feel our weaknesses (Hebrews 4:15).",
          "Must have something to offer—His own blood (Hebrews 9:12)."
        ],
        scripture: "Hebrews 2:14-17, Hebrews 4:15, Hebrews 5:4-5"
      },
      {
        title: "Diagram: Earthly vs. Heavenly Priesthood",
        content: [
          "",
          "  ┌─────────────────────────────────────────────────────────────┐",
          "  │           EARTHLY PRIESTHOOD    vs.    HEAVENLY PRIESTHOOD │",
          "  ├─────────────────────────────────────────────────────────────┤",
          "  │                                                             │",
          "  │  Many priests (succession)    │   One Priest (eternal)      │",
          "  │  Sinful priests               │   Sinless Priest            │",
          "  │  Offered animal blood         │   Offered His own blood     │",
          "  │  Earthly sanctuary            │   Heavenly sanctuary        │",
          "  │  Temporary                    │   Eternal                   │",
          "  │  Could not perfect            │   Perfects forever          │",
          "  │                                                             │",
          "  └─────────────────────────────────────────────────────────────┘",
          "",
          "Jesus is the perfect High Priest—better than any earthly priest."
        ],
        scripture: "Hebrews 7:23-28"
      },
      {
        title: "What Jesus Does as High Priest",
        content: [
          "He intercedes for us—praying on our behalf (Romans 8:34).",
          "He presents His blood—as the payment for our sins (Hebrews 9:12).",
          "He mediates the new covenant—writing God's law on our hearts (Hebrews 8:6-10).",
          "He sympathizes with our weaknesses—He has been tempted as we are (Hebrews 4:15)."
        ],
        scripture: "Romans 8:34, Hebrews 7:25, Hebrews 9:12"
      },
      {
        title: "Our Response",
        content: [
          "Come boldly to the throne of grace (Hebrews 4:16).",
          "Hold fast our confession (Hebrews 4:14).",
          "Draw near with a true heart (Hebrews 10:22).",
          "Confess our sins (1 John 1:9)."
        ],
        scripture: "Hebrews 4:14-16, 1 John 1:9"
      }
    ],
    reflectionQuestions: [
      "What is the purpose of a high priest?",
      "Who is our High Priest today?",
      "How does Jesus' priesthood benefit me?",
      "How should we respond to Jesus as our High Priest?"
    ],
    prayerPrompt: "Lord Jesus, thank You for being my High Priest. Thank You for interceding for me before the Father. Help me to come boldly to the throne of grace. Amen.",
    keyWords: [
      { word: "High Priest", definition: "Our representative before God" },
      { word: "Mediator", definition: "The one who brings God and humanity together" },
      { word: "Intercession", definition: "Praying on behalf of others" }
    ],
    application: [
      "Come boldly to God's throne—Jesus is your High Priest",
      "Confess your sins—He is faithful to forgive",
      "Trust His intercession, not your own goodness"
    ],
    audioFile: "/audio/discover/lesson6.mp3"
  },
  7: {
    id: 7,
    title: "Christ the Mathematician - The 2300 Days",
    subtitle: "God's prophetic timeline",
    introduction: "The 2300-day prophecy of Daniel 8 points to 1844 as the beginning of the cleansing of the heavenly sanctuary—the antitypical Day of Atonement. This prophecy confirms God's control over history.",
    memoryVerse: "Daniel 8:14 - 'For two thousand three hundred days; then the sanctuary shall be cleansed.'",
    sections: [
      {
        title: "The Vision of Daniel 8",
        content: [
          "Daniel saw a ram with two horns—representing Medo-Persia.",
          "Then a male goat with a notable horn—representing Greece and Alexander the Great.",
          "The goat's horn was broken, and four horns arose—the division of Greece.",
          "Out of one came a little horn—representing the Antichrist power."
        ],
        scripture: "Daniel 8:3-12, 20-25"
      },
      {
        title: "Diagram: The 2300-Day Prophecy",
        content: [
          "",
          "  ┌─────────────────────────────────────────────────────────────┐",
          "  │                    2300 DAY PROPHECY                        │",
          "  │                  (2300 years - 457 BC to 1844 AD)          │",
          "  ├─────────────────────────────────────────────────────────────┤",
          "  │                                                             │",
          "  │  457 BC                                                     │",
          "  │    │                                                        │",
          "  │    │  Decree to restore and rebuild Jerusalem              │",
          "  │    │                                                        │",
          "  │    └────────────────────┬──────────────────────────────────│",
          "  │                         │                                  │",
          "  │                     27 AD                                  │",
          "  │                    (69 weeks)                              │",
          "  │                    Messiah appears                         │",
          "  │                         │                                  │",
          "  │                     31 AD                                  │",
          "  │                    (70th week)                             │",
          "  │                    Messiah cut off                         │",
          "  │                         │                                  │",
          "  │                    1844 AD                                 │",
          "  │                    Sanctuary cleansed                      │",
          "  │                    Judgment begins                         │",
          "  │                                                             │",
          "  └─────────────────────────────────────────────────────────────┘",
          "",
          "The 2300-day prophecy is the longest time prophecy in the Bible."
        ],
        scripture: "Daniel 8:14, Daniel 9:24-27"
      },
      {
        title: "The Day-Year Principle",
        content: [
          "In prophetic symbolism, a day represents a year.",
          "This principle is established in Ezekiel 4:6 and Numbers 14:34.",
          "Therefore, 2300 days = 2300 years."
        ],
        scripture: "Ezekiel 4:6, Numbers 14:34"
      },
      {
        title: "The Starting Point",
        content: [
          "The starting point is the decree to restore and rebuild Jerusalem.",
          "This decree was issued by Artaxerxes in 457 BC (Ezra 7:7-26).",
          "The 70-week prophecy (490 years) was cut off from the 2300 days.",
          "Both prophecies share the same starting point—457 BC."
        ],
        scripture: "Ezra 7:7-26, Daniel 9:24-27"
      },
      {
        title: "The End Point - 1844",
        content: [
          "2300 years from 457 BC brings us to AD 1844.",
          "In 1844, the cleansing of the sanctuary began—the antitypical Day of Atonement.",
          "This is when the investigative judgment started."
        ],
        scripture: "Daniel 8:14"
      },
      {
        title: "The Great Disappointment",
        content: [
          "Many believers expected Jesus to return in 1844 based on this prophecy.",
          "When He didn't, they experienced the Great Disappointment.",
          "But God had a greater purpose—the judgment had begun, not the end."
        ],
        scripture: "Revelation 10:9-11"
      }
    ],
    reflectionQuestions: [
      "When did the 2300-day prophecy begin?",
      "What event marks the start?",
      "What happened in 1844?",
      "What was the Great Disappointment, and what did it teach?"
    ],
    prayerPrompt: "Lord, thank You for revealing the future through prophecy. Help me to trust Your timing. Prepare me for the judgment. Amen.",
    keyWords: [
      { word: "2300 Days", definition: "2300 years—the longest time prophecy" },
      { word: "Day-Year Principle", definition: "In prophecy, a day represents a year" },
      { word: "Cleansing of the Sanctuary", definition: "The judgment that began in 1844" }
    ],
    application: [
      "Study the 2300-day prophecy",
      "Trust God's prophetic timeline",
      "Prepare for the judgment"
    ],
    audioFile: "/audio/discover/lesson7.mp3"
  },
  8: {
    id: 8,
    title: "Christ the Atonement",
    subtitle: "The blotting out of sin",
    introduction: "The Day of Atonement was the climax of the sanctuary year. It pointed to the final work of Christ—cleansing the heavenly sanctuary and blotting out sin.",
    memoryVerse: "Leviticus 16:30 - 'For on that day the priest shall make atonement for you, to cleanse you.'",
    sections: [
      {
        title: "The Day of Atonement",
        content: [
          "The Day of Atonement (Yom Kippur) was the holiest day of the year.",
          "It was a day of fasting, confession, and affliction of soul.",
          "On this day, the sanctuary was cleansed from the sins that had accumulated all year."
        ],
        scripture: "Leviticus 16:29-34, Leviticus 23:26-32"
      },
      {
        title: "Diagram: The Day of Atonement",
        content: [
          "",
          "  ┌─────────────────────────────────────────────────────────────┐",
          "  │                    DAY OF ATONEMENT                        │",
          "  ├─────────────────────────────────────────────────────────────┤",
          "  │                                                             │",
          "  │  1. High priest sacrifices bull for his own sins            │",
          "  │                                                             │",
          "  │  2. Lots are cast over two goats                            │",
          "  │                                                             │",
          "  │  3. Goat for the Lord is sacrificed                         │",
          "  │     • Blood taken into Most Holy Place                      │",
          "  │     • Sprinkled on mercy seat                               │",
          "  │     • Sanctuary cleansed                                    │",
          "  │                                                             │",
          "  │  4. High priest confesses sins over scapegoat               │",
          "  │     • Sins transferred to scapegoat                         │",
          "  │                                                             │",
          "  │  5. Scapegoat is led into the wilderness                    │",
          "  │     • Sins removed from the camp forever                    │",
          "  │                                                             │",
          "  └─────────────────────────────────────────────────────────────┘",
          "",
          "The Day of Atonement represents the final judgment."
        ],
        scripture: "Leviticus 16"
      },
      {
        title: "The Two Goats",
        content: [
          "GOAT FOR THE LORD: Sacrificed—representing Christ's death.",
          "SCAPEGOAT (Azazel): Sent into the wilderness—representing Satan bearing the final responsibility for sin.",
          "Both goats were required—one died, one was banished."
        ],
        scripture: "Leviticus 16:5-10, 20-22"
      },
      {
        title: "The Cleansing of the Sanctuary",
        content: [
          "The sanctuary had been polluted by the sins transferred throughout the year.",
          "On the Day of Atonement, it was cleansed—the sins were removed.",
          "This represents the final judgment—when the record of sin is blotted out."
        ],
        scripture: "Leviticus 16:16, 19"
      },
      {
        title: "Forgiveness vs. Blotting Out",
        content: [
          "FORGIVENESS: Daily—sins are forgiven but the record remains.",
          "BLOTTING OUT: Yearly—sins are completely removed.",
          "The daily service forgave sins; the Day of Atonement removed them."
        ],
        scripture: "Acts 3:19, Isaiah 43:25"
      },
      {
        title: "The Antitypical Day of Atonement",
        content: [
          "In 1844, the antitypical Day of Atonement began.",
          "Jesus entered the Most Holy Place to begin the final work of atonement.",
          "This is the investigative judgment—where our sins are blotted out."
        ],
        scripture: "Daniel 8:14, Hebrews 9:23"
      }
    ],
    reflectionQuestions: [
      "What happened on the Day of Atonement?",
      "What is the difference between forgiveness and blotting out?",
      "What do the two goats represent?",
      "What is our role today in the antitypical Day of Atonement?"
    ],
    prayerPrompt: "Lord, thank You for the Day of Atonement—the blotting out of sin. Cleanse me from all unrighteousness. Let my sins be blotted out in the judgment. Amen.",
    keyWords: [
      { word: "Yom Kippur", definition: "The Day of Atonement—the holiest day" },
      { word: "Blotting Out", definition: "The final removal of sin's record" },
      { word: "Azazel", definition: "The scapegoat—representing Satan" }
    ],
    application: [
      "Examine your heart—afflict your soul",
      "Confess your sins—let them be blotted out",
      "Prepare for the judgment"
    ],
    audioFile: "/audio/discover/lesson8.mp3"
  },
  9: {
    id: 9,
    title: "Christ the Advocate",
    subtitle: "Our defense attorney in heaven",
    introduction: "Jesus is our Advocate in the heavenly court. The investigative judgment is a demonstration of God's justice and love to the universe.",
    memoryVerse: "1 John 2:1 - 'We have an Advocate with the Father, Jesus Christ the righteous.'",
    sections: [
      {
        title: "The Heavenly Court",
        content: [
          "Daniel saw the court seated and the books opened.",
          "The Ancient of Days took His seat—God the Father as Judge.",
          "Thousands upon thousands ministered to Him—angels witnessing the proceedings.",
          "The books were opened—the records of human lives."
        ],
        scripture: "Daniel 7:9-10, Revelation 20:12"
      },
      {
        title: "Diagram: The Heavenly Court",
        content: [
          "",
          "  ┌─────────────────────────────────────────────────────────────┐",
          "  │                    THE HEAVENLY COURT                       │",
          "  ├─────────────────────────────────────────────────────────────┤",
          "  │                                                             │",
          "  │                    ┌─────────────┐                          │",
          "  │                    │    GOD      │                          │",
          "  │                    │   THE       │                          │",
          "  │                    │   JUDGE     │                          │",
          "  │                    └──────┬──────┘                          │",
          "  │                           │                                │",
          "  │              ┌────────────┴────────────┐                   │",
          "  │              │                         │                   │",
          "  │         ┌────┴────┐               ┌────┴────┐              │",
          "  │         │ SATAN  │               │ JESUS  │              │",
          "  │         │Prosec- │               │Advocate│              │",
          "  │         │ utor   │               │        │              │",
          "  │         └────────┘               └────────┘              │",
          "  │              │                         │                   │",
          "  │              └────────────┬────────────┘                   │",
          "  │                           │                                │",
          "  │                    ┌──────┴──────┐                          │",
          "  │                    │  BELIEVER  │                          │",
          "  │                    │  ON TRIAL  │                          │",
          "  │                    └────────────┘                          │",
          "  │                                                             │",
          "  └─────────────────────────────────────────────────────────────┘",
          "",
          "Satan accuses, Jesus defends, and the believer is declared righteous."
        ],
        scripture: "Zechariah 3:1-5, Revelation 12:10"
      },
      {
        title: "The Players in the Judgment",
        content: [
          "THE JUDGE: God the Father—presiding over the court (John 5:22).",
          "THE ADVOCATE: Jesus Christ—defending the believer (1 John 2:1).",
          "THE PROSECUTOR: Satan—accusing the brethren (Revelation 12:10).",
          "THE WITNESSES: Angels—observing the proceedings (1 Corinthians 4:9).",
          "THE DEFENDANT: The believer—being judged (2 Corinthians 5:10)."
        ],
        scripture: "John 5:22, 1 John 2:1, Revelation 12:10"
      },
      {
        title: "The Books of Record",
        content: [
          "THE BOOK OF LIFE: Contains the names of the redeemed (Revelation 20:12).",
          "THE BOOK OF REMEMBRANCE: Records the good deeds of the faithful (Malachi 3:16).",
          "THE BOOK OF DEEDS: Records all actions, words, and thoughts (Ecclesiastes 12:14)."
        ],
        scripture: "Revelation 20:12, Malachi 3:16, Ecclesiastes 12:14"
      },
      {
        title: "The Basis of Acquittal",
        content: [
          "Not our good works—they are imperfect.",
          "Not our lack of sin—we have all sinned.",
          "But the blood of Jesus—His righteousness credited to us.",
          "Jesus points to His wounds and says, 'This one is Mine.'"
        ],
        scripture: "Romans 3:23-24, 1 John 1:7"
      },
      {
        title: "The Purpose of the Judgment",
        content: [
          "To vindicate God's character—showing He is just and loving.",
          "To demonstrate that His judgments are fair.",
          "To reveal to the universe which side each person chose.",
          "To determine who will be saved and who will be lost."
        ],
        scripture: "Romans 3:26, 1 Corinthians 4:5"
      }
    ],
    reflectionQuestions: [
      "What are the three phases of judgment?",
      "Who presides at the judgment?",
      "Who is our Advocate?",
      "Who is the Prosecutor?",
      "What is the legal basis for our acquittal?"
    ],
    prayerPrompt: "Lord Jesus, thank You for being my Advocate. When Satan accuses me, You defend me. I rest in Your blood and righteousness. Amen.",
    keyWords: [
      { word: "Advocate", definition: "Our defense attorney—Jesus Christ" },
      { word: "Investigative Judgment", definition: "The judgment that began in 1844" },
      { word: "Book of Life", definition: "The record of those who belong to God" }
    ],
    application: [
      "Trust Jesus as your Advocate",
      "Don't listen to Satan's accusations",
      "Live with confidence—your case is in good hands"
    ],
    audioFile: "/audio/discover/lesson9.mp3"
  },
  // ==================== THREE ANGELS' MESSAGES (Lessons 10-19) ====================
  10: {
    id: 10,
    title: "Revelation's Three Angels' Messages",
    subtitle: "God's final warning to the world",
    introduction: "Revelation 14 reveals God's final warning message to the world—three angels proclaiming the everlasting gospel, the fall of Babylon, and the warning against the beast. This is the message for the last days.",
    memoryVerse: "Revelation 14:6 - 'Then I saw another angel flying in the midst of heaven, having the everlasting gospel to preach.'",
    sections: [
      {
        title: "The Three Angels' Messages Overview",
        content: [
          "FIRST ANGEL: Fear God, give glory to Him, worship the Creator (Revelation 14:6-7).",
          "SECOND ANGEL: Babylon is fallen—come out of her (Revelation 14:8).",
          "THIRD ANGEL: Don't receive the mark of the beast (Revelation 14:9-11).",
          "",
          "These messages are God's final appeal to a world on the brink of judgment."
        ],
        scripture: "Revelation 14:6-12"
      },
      {
        title: "Diagram: The Three Angels",
        content: [
          "",
          "  ┌─────────────────────────────────────────────────────────────┐",
          "  │                    THREE ANGELS' MESSAGES                   │",
          "  ├─────────────────────────────────────────────────────────────┤",
          "  │                                                             │",
          "  │  ┌─────────────────────────────────────────────────────┐   │",
          "  │  │  FIRST ANGEL                                        │   │",
          "  │  │  \"Fear God and give glory to Him, for the hour of  │   │",
          "  │  │   His judgment has come. Worship Him who made       │   │",
          "  │  │   heaven and earth, the sea and springs of water.\"  │   │",
          "  │  └─────────────────────────────────────────────────────┘   │",
          "  │                           │                                 │",
          "  │  ┌─────────────────────────────────────────────────────┐   │",
          "  │  │  SECOND ANGEL                                       │   │",
          "  │  │  \"Babylon is fallen, is fallen, that great city,   │   │",
          "  │  │   because she has made all nations drink of the    │   │",
          "  │  │   wine of the wrath of her fornication.\"           │   │",
          "  │  └─────────────────────────────────────────────────────┘   │",
          "  │                           │                                 │",
          "  │  ┌─────────────────────────────────────────────────────┐   │",
          "  │  │  THIRD ANGEL                                        │   │",
          "  │  │  \"If anyone worships the beast and his image...   │   │",
          "  │  │   he shall drink of the wine of the wrath of God.\" │   │",
          "  │  └─────────────────────────────────────────────────────┘   │",
          "  │                                                             │",
          "  └─────────────────────────────────────────────────────────────┘",
          "",
          "The three angels' messages are sequential and build on each other."
        ],
        scripture: "Revelation 14:6-12"
      },
      {
        title: "The Everlasting Gospel",
        content: [
          "The first angel has 'the everlasting gospel'—the good news of salvation.",
          "This gospel is eternal—unchanging from generation to generation.",
          "It is the message of God's love, Christ's sacrifice, and salvation by faith."
        ],
        scripture: "Revelation 14:6, 1 Corinthians 15:1-4"
      },
      {
        title: "The Universal Call",
        content: [
          "The message is for 'every nation, tribe, tongue, and people.'",
          "No one is excluded—God's final warning goes to all humanity.",
          "This is the global gospel—the last call before the end."
        ],
        scripture: "Revelation 14:6, Matthew 24:14"
      },
      {
        title: "The Central Issue: Worship",
        content: [
          "The three angels' messages are about worship—who will we worship?",
          "First Angel: Worship the Creator.",
          "Second Angel: Reject false worship (Babylon).",
          "Third Angel: Don't worship the beast."
        ],
        scripture: "Revelation 14:7, 9"
      }
    ],
    reflectionQuestions: [
      "What is the first angel's message?",
      "What does the second angel announce?",
      "What does the third angel warn against?",
      "What is the central issue of the three angels' messages?"
    ],
    prayerPrompt: "Lord, help me to understand and share the three angels' messages. Let me worship You as Creator and Redeemer. Keep me from receiving the mark of the beast. Amen.",
    keyWords: [
      { word: "Everlasting Gospel", definition: "The good news of salvation through Christ" },
      { word: "Babylon", definition: "A symbol of false religion—confusion and apostasy" },
      { word: "Mark of the Beast", definition: "The opposite of the seal of God—false worship" }
    ],
    application: [
      "Study Revelation 14",
      "Share the three angels' messages with someone",
      "Choose to worship the Creator"
    ],
    audioFile: "/audio/discover/lesson10.mp3"
  },
  11: {
    id: 11,
    title: "First Angel's Message (Part 1) - Fear God",
    subtitle: "Reverence for the Creator",
    introduction: "The first angel calls us to fear God and give Him glory. This is not a fear of terror, but a reverential awe for our Creator and Judge. The hour of His judgment has come.",
    memoryVerse: "Ecclesiastes 12:13 - 'Fear God and keep His commandments, for this is man's all.'",
    sections: [
      {
        title: "What Does It Mean to Fear God?",
        content: [
          "To fear God means to reverence Him—to recognize His greatness and our smallness.",
          "It means to take God seriously—to obey Him even when it's costly.",
          "It means to please God rather than man—to prioritize His approval over human approval."
        ],
        scripture: "Proverbs 1:7, Acts 5:29, Galatians 1:10"
      },
      {
        title: "The Fear of God vs. Worldly Fear",
        content: [
          "WORLDLY FEAR: Fear of man, fear of failure, fear of death—paralyzing.",
          "FEAR OF GOD: Reverential awe, respect, submission—liberating.",
          "The fear of God is the beginning of wisdom—not the end."
        ],
        scripture: "Proverbs 9:10, Isaiah 8:12-13"
      },
      {
        title: "The Hour of His Judgment",
        content: [
          "The first angel announces that the hour of God's judgment has come.",
          "This is the pre-advent judgment that began in 1844.",
          "The judgment is not something to fear—it's good news that God is about to set things right."
        ],
        scripture: "Daniel 7:9-10, Revelation 14:7"
      },
      {
        title: "The Judgment as Good News",
        content: [
          "The judgment vindicates God's people—showing that God's judgments are just.",
          "It demonstrates that God has been fair with everyone.",
          "It reveals that sin will be eradicated and justice will prevail."
        ],
        scripture: "Daniel 7:22, Romans 2:5-11"
      },
      {
        title: "The Standard in Judgment",
        content: [
          "The standard in judgment is God's law—the Ten Commandments.",
          "The law shows us our sin and our need for a Savior.",
          "But Jesus is our Advocate—He points to His blood and says, 'Not guilty.'"
        ],
        scripture: "James 2:10-12, 1 John 2:1"
      }
    ],
    reflectionQuestions: [
      "What does it mean to 'fear God'?",
      "Why is judgment good news?",
      "What is the standard in judgment?",
      "How should the judgment affect how we live?"
    ],
    prayerPrompt: "Lord, help me to fear You—to reverence You and take You seriously. Thank You that the judgment is good news. Prepare me for that day. Amen.",
    keyWords: [
      { word: "Fear of God", definition: "Reverential awe—respect and submission" },
      { word: "Judgment", definition: "God's final assessment of human lives" },
      { word: "Standard", definition: "God's law—the Ten Commandments" }
    ],
    application: [
      "Fear God, not man",
      "Take God seriously—obey Him",
      "Look forward to the judgment with confidence"
    ],
    audioFile: "/audio/discover/lesson11.mp3"
  },
  12: {
    id: 12,
    title: "First Angel's Message (Part 2) - Give Glory to God",
    subtitle: "Reflecting His character",
    introduction: "Giving glory to God means reflecting His character to the world. We glorify God by living lives that honor Him and by sharing His love. Our lives are the only Bible some people will ever read.",
    memoryVerse: "Matthew 5:16 - 'Let your light so shine before men, that they may see your good works and glorify your Father in heaven.'",
    sections: [
      {
        title: "What Does It Mean to Give Glory to God?",
        content: [
          "To give glory to God means to reflect His character—to be like Him.",
          "It means to live in a way that brings honor to His name.",
          "It means to acknowledge that He is the source of all good things."
        ],
        scripture: "1 Corinthians 6:20, 1 Corinthians 10:31"
      },
      {
        title: "Glorifying God Through Obedience",
        content: [
          "We glorify God by keeping His commandments—not to be saved, but because we are saved.",
          "Obedience is the fruit of faith—evidence that we truly love God.",
          "When we obey, we show that God's law is good and that He is worthy of our trust."
        ],
        scripture: "John 14:15, 1 John 5:3"
      },
      {
        title: "Glorifying God Through Witnessing",
        content: [
          "We glorify God by sharing what He has done for us.",
          "Our testimonies point others to Him.",
          "When we tell others about Jesus, we give Him glory."
        ],
        scripture: "Psalm 96:3, Revelation 12:11"
      },
      {
        title: "Glorifying God Through Character",
        content: [
          "The fruit of the Spirit glorifies God.",
          "Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control—these reflect His character.",
          "When people see Christ in us, they glorify God."
        ],
        scripture: "Galatians 5:22-23, 2 Corinthians 3:18"
      },
      {
        title: "Glorifying God Through Worship",
        content: [
          "We glorify God by worshiping Him as Creator.",
          "The Sabbath is a memorial of creation—keeping it holy gives glory to the Creator.",
          "True worship is not about location—it's about spirit and truth."
        ],
        scripture: "Revelation 14:7, John 4:23-24"
      }
    ],
    reflectionQuestions: [
      "What does it mean to 'give glory' to God?",
      "How is glorifying God linked to worship?",
      "When did the judgment start?",
      "How can you glorify God today?"
    ],
    prayerPrompt: "Lord, help me to glorify You in all I do. Let my life reflect Your character. Use me to bring glory to Your name. Amen.",
    keyWords: [
      { word: "Glory", definition: "The visible manifestation of God's character" },
      { word: "Reflection", definition: "Showing God's character in our lives" },
      { word: "Worship", definition: "Giving glory to God—acknowledging His worth" }
    ],
    application: [
      "Live in a way that honors God",
      "Share your testimony with someone",
      "Let the fruit of the Spirit be evident in your life"
    ],
    audioFile: "/audio/discover/lesson12.mp3"
  },
  13: {
    id: 13,
    title: "Second Angel's Message - Babylon is Fallen (Part 1)",
    subtitle: "Identifying false religion",
    introduction: "Babylon represents false religion—systems that mix truth with error, substitute human authority for divine authority, and lead people away from God. The second angel announces her fall.",
    memoryVerse: "Revelation 14:8 - 'Babylon is fallen, is fallen, that great city.'",
    sections: [
      {
        title: "What Is Babylon?",
        content: [
          "Babylon represents false religious systems that have departed from God's truth.",
          "The name 'Babylon' means confusion—and false religion has confused God's truth.",
          "Babylon is not just one denomination—it's any system that puts human tradition above God's Word."
        ],
        scripture: "Revelation 17:5, Genesis 11:9"
      },
      {
        title: "The Characteristics of Babylon",
        content: [
          "1. Mixes truth with error—has a form of godliness but denies its power.",
          "2. Substitutes human tradition for God's commandments.",
          "3. Persecutes those who remain faithful to God.",
          "4. Has made the nations drunk with false doctrine.",
          "5. Is a harlot—unfaithful to God."
        ],
        scripture: "Revelation 17:1-6, 2 Timothy 3:5"
      },
      {
        title: "The Wine of Babylon",
        content: [
          "The 'wine of Babylon' represents false doctrine—teachings that lead people away from truth.",
          "This wine makes the nations drunk—spiritually intoxicated, unable to discern truth from error.",
          "Babylon's wine includes teachings like the immortality of the soul, eternal torment, Sunday sacredness, and more."
        ],
        scripture: "Revelation 14:8, Revelation 17:2"
      },
      {
        title: "Babylon in History",
        content: [
          "The original Babylon (Babel) was where humanity first united in rebellion against God.",
          "Spiritual Babylon represents the continuation of that rebellion—human systems that oppose God.",
          "Throughout history, Babylon has taken different forms, but the spirit remains the same."
        ],
        scripture: "Genesis 11:1-9"
      },
      {
        title: "The Fall of Babylon",
        content: [
          "Babylon is fallen—not yet fully, but spiritually.",
          "Her fall is progressive—she continues to decline as more people leave her.",
          "The final fall will come at the end, when Babylon is completely destroyed."
        ],
        scripture: "Revelation 18:2, 21"
      }
    ],
    reflectionQuestions: [
      "What does Babylon represent?",
      "What are the characteristics of Babylon?",
      "What is the 'wine of Babylon'?",
      "Why is Babylon fallen?"
    ],
    prayerPrompt: "Lord, help me to recognize Babylon and come out of her. Give me discernment to distinguish truth from error. Let me not be deceived by false doctrine. Amen.",
    keyWords: [
      { word: "Babylon", definition: "A symbol of false religion—confusion and apostasy" },
      { word: "Wine", definition: "False doctrine that intoxicates and deceives" },
      { word: "Fallen", definition: "Spiritually bankrupt—already judged by God" }
    ],
    application: [
      "Study Revelation 17 and 18",
      "Examine your beliefs—are they based on Scripture or tradition?",
      "Be willing to come out of Babylon"
    ],
    audioFile: "/audio/discover/lesson13.mp3"
  },
  14: {
    id: 14,
    title: "Second Angel's Message - Babylon is Fallen (Part 2)",
    subtitle: "Characteristics of false religion",
    introduction: "Babylon is identified by specific characteristics: mixing truth with error, human authority, idolatry, false teaching about death, Sunday worship, and neglect of the body.",
    memoryVerse: "Isaiah 8:20 - 'To the law and to the testimony! If they do not speak according to this word, it is because there is no light in them.'",
    sections: [
      {
        title: "Six Characteristics of Babylon",
        content: [
          "1. MIXES TRUTH WITH ERROR: Has a form of godliness but denies its power.",
          "2. HUMAN AUTHORITY: Substitutes human tradition for God's commandments.",
          "3. IDOLATRY: Worships images and relics instead of God alone.",
          "4. FALSE TEACHING ABOUT DEATH: Teaches the immortality of the soul.",
          "5. SUNDAY WORSHIP: Has changed the Sabbath to Sunday.",
          "6. NEGLECT OF THE BODY: Ignores God's health laws."
        ],
        scripture: "2 Timothy 3:5, Mark 7:8-9, Ecclesiastes 9:5, Daniel 7:25"
      },
      {
        title: "The True Church vs. Babylon",
        content: [
          "TRUE CHURCH: Keeps God's commandments, has the testimony of Jesus, follows Scripture alone.",
          "BABYLON: Mixes truth with error, follows human tradition, persecutes God's people.",
          "The contrast helps us identify which is which."
        ],
        scripture: "Revelation 12:17, Revelation 14:12"
      },
      {
        title: "The Call to Come Out",
        content: [
          "God calls His people to come out of Babylon—to separate from falsehood and embrace truth.",
          "This is not a call to leave the world—it's a call to leave false religion.",
          "Those who come out will be spared from Babylon's plagues."
        ],
        scripture: "Revelation 18:4"
      },
      {
        title: "Testing the Spirits",
        content: [
          "We are to test all teaching by Scripture.",
          "If it doesn't align with God's Word, it's not from God.",
          "The Bereans were noble because they searched the Scriptures daily to see if what they heard was true."
        ],
        scripture: "1 John 4:1, Acts 17:11"
      },
      {
        title: "The Urgency of the Call",
        content: [
          "The call to come out is urgent—judgment is coming.",
          "Babylon will be destroyed, and those still in her will share her fate.",
          "Now is the time to choose whom we will serve."
        ],
        scripture: "Revelation 18:4-5"
      }
    ],
    reflectionQuestions: [
      "What are the six characteristics of Babylon?",
      "How can we identify counterfeit religion?",
      "What does God call His people to do?",
      "Why is the call urgent?"
    ],
    prayerPrompt: "Lord, help me to recognize the characteristics of Babylon. Give me courage to come out of her. Let me stand for truth, even when it's costly. Amen.",
    keyWords: [
      { word: "Counterfeit", definition: "A false copy—something that looks genuine but isn't" },
      { word: "Apostasy", definition: "Departure from the truth" },
      { word: "Discernment", definition: "The ability to distinguish truth from error" }
    ],
    application: [
      "Test all teaching by Scripture",
      "Be willing to leave falsehood for truth",
      "Stand for God's Word, not human tradition"
    ],
    audioFile: "/audio/discover/lesson14.mp3"
  },
  15: {
    id: 15,
    title: "Second Angel's Message - Come Out of Her",
    subtitle: "The call to separation",
    introduction: "God's final appeal is to come out of Babylon. The call is urgent because judgment is coming and Babylon will be destroyed. This is not a call to hate people—it's a call to leave false systems.",
    memoryVerse: "Revelation 18:4 - 'Come out of her, my people, lest you share in her sins.'",
    sections: [
      {
        title: "God's People Are in Babylon",
        content: [
          "God calls them 'My people'—even though they are in Babylon, they belong to Him.",
          "He doesn't abandon them—He calls them out.",
          "There are sincere believers in every denomination, but God wants them to come to the full truth."
        ],
        scripture: "Revelation 18:4"
      },
      {
        title: "Why Come Out?",
        content: [
          "To avoid sharing in her sins—participating in false worship.",
          "To avoid receiving her plagues—judgment is coming.",
          "To worship God in spirit and truth—not in error.",
          "To be part of God's faithful remnant."
        ],
        scripture: "Revelation 18:4-5"
      },
      {
        title: "When to Come Out",
        content: [
          "Now—not later. The call is urgent.",
          "Don't wait until the crisis comes—decide today.",
          "The longer we stay, the harder it becomes to leave."
        ],
        scripture: "Hebrews 3:7-8"
      },
      {
        title: "What Will Happen to Babylon",
        content: [
          "Babylon will be destroyed—completely and permanently.",
          "Her plagues will fall, and she will be burned with fire.",
          "The destruction is sudden—in one hour."
        ],
        scripture: "Revelation 18:8, 21"
      },
      {
        title: "The Blessing of Coming Out",
        content: [
          "Those who come out will be protected.",
          "They will be part of God's faithful remnant.",
          "They will be ready for Jesus' return."
        ],
        scripture: "Revelation 18:4, Revelation 14:12"
      }
    ],
    reflectionQuestions: [
      "Why should we come out of Babylon?",
      "What will happen to Babylon?",
      "When should we come out?",
      "What is God's promise to those who come out?"
    ],
    prayerPrompt: "Lord, help me to come out of Babylon. Give me courage to leave falsehood for truth. Protect me in the coming crisis. I choose to follow You. Amen.",
    keyWords: [
      { word: "Separation", definition: "Leaving falsehood to follow truth" },
      { word: "Remnant", definition: "God's faithful people in the last days" },
      { word: "Plagues", definition: "God's judgments on Babylon" }
    ],
    application: [
      "Examine your beliefs—are they based on Scripture?",
      "Be willing to leave error for truth",
      "Choose today whom you will serve"
    ],
    audioFile: "/audio/discover/lesson15.mp3"
  },
  16: {
    id: 16,
    title: "Third Angel's Message - The Beast (Part 1)",
    subtitle: "Identifying the beast power",
    introduction: "The third angel warns against receiving the mark of the beast. To understand this warning, we must first understand who the beast is. The beast of Revelation 13 is a religious-political power that opposes God.",
    memoryVerse: "Revelation 13:1 - 'Then I saw a beast rising up out of the sea, having seven heads and ten horns.'",
    sections: [
      {
        title: "The Beast from the Sea",
        content: [
          "The beast rises from the sea—the sea represents peoples, multitudes, nations, and tongues.",
          "It has seven heads and ten horns—representing world powers.",
          "It receives power from the dragon—Satan."
        ],
        scripture: "Revelation 13:1, Revelation 17:15"
      },
      {
        title: "The Characteristics of the Beast",
        content: [
          "1. Blasphemous names—claiming divine authority.",
          "2. Speaks blasphemies against God.",
          "3. Makes war with the saints.",
          "4. Has authority over every tribe, tongue, and nation.",
          "5. Receives a deadly wound that is healed."
        ],
        scripture: "Revelation 13:1-8"
      },
      {
        title: "The Beast in Daniel 7",
        content: [
          "Daniel saw four beasts—representing four world empires.",
          "The fourth beast had ten horns—representing the barbarian kingdoms that followed Rome.",
          "A little horn arose—the Antichrist power.",
          "This little horn matches the beast of Revelation 13."
        ],
        scripture: "Daniel 7:7-8, 23-25"
      },
      {
        title: "The Ten Clues to Identify the Beast",
        content: [
          "1. Rises from Western Europe.",
          "2. A 'little' kingdom that grows.",
          "3. Rises after the ten barbarian tribes.",
          "4. Overcomes three of the ten tribes.",
          "5. Is different from the other ten.",
          "6. Has a man at its head.",
          "7. Speaks blasphemies.",
          "8. Persecutes the saints.",
          "9. Rules for 1260 years.",
          "10. Changes times and law."
        ],
        scripture: "Daniel 7:8-25"
      },
      {
        title: "The Identity of the Beast",
        content: [
          "The beast that matches all ten clues is the Papal Roman Empire.",
          "It rose in Western Europe, overcame three tribes (Heruli, Vandals, Ostrogoths), and ruled from AD 538 to 1798.",
          "It claimed to change God's law—including the Sabbath to Sunday."
        ],
        scripture: "Daniel 7:25"
      }
    ],
    reflectionQuestions: [
      "Who is the beast of Revelation 13?",
      "What are the characteristics of this beast?",
      "What are the ten identifying clues from Daniel 7?",
      "How long did the little horn rule?"
    ],
    prayerPrompt: "Lord, help me to understand prophecy. Give me discernment to recognize the beast and avoid its mark. Protect me from deception. Amen.",
    keyWords: [
      { word: "Beast", definition: "A symbol of a kingdom—the Papal Roman Empire" },
      { word: "Blasphemy", definition: "Claiming divine authority or prerogatives" },
      { word: "Little Horn", definition: "The Antichrist power—same as the beast" }
    ],
    application: [
      "Study Daniel 7 and Revelation 13",
      "Understand the characteristics of the beast",
      "Be aware of the issues in the final conflict"
    ],
    audioFile: "/audio/discover/lesson16.mp3"
  },
  17: {
    id: 17,
    title: "Third Angel's Message - The Mark of the Beast (Part 2)",
    subtitle: "The seal of God vs. the mark of the beast",
    introduction: "The mark of the beast is the opposite of the seal of God. While the seal of God is the Sabbath, the mark of the beast is Sunday worship enforced by human authority. This is the final test of loyalty.",
    memoryVerse: "Revelation 14:12 - 'Here are those who keep the commandments of God and the faith of Jesus.'",
    sections: [
      {
        title: "The Seal of God",
        content: [
          "The seal of God is placed on the foreheads of those who worship Him.",
          "The seal represents ownership and protection—it shows that we belong to God.",
          "The Sabbath is the seal of God—it contains His name (Lord), His title (Creator), and His territory (heaven and earth)."
        ],
        scripture: "Revelation 7:1-4, Exodus 20:11"
      },
      {
        title: "Diagram: The Seal of God",
        content: [
          "",
          "  ┌─────────────────────────────────────────────────────────────┐",
          "  │                    THE SEAL OF GOD                          │",
          "  ├─────────────────────────────────────────────────────────────┤",
          "  │                                                             │",
          "  │  \"Remember the Sabbath day, to keep it holy.               │",
          "  │   Six days you shall labor and do all your work,           │",
          "  │   but the seventh day is the Sabbath of the Lord your God. │",
          "  │   For in six days the Lord made the heavens and the earth, │",
          "  │   the sea, and all that is in them, and rested the seventh │",
          "  │   day. Therefore the Lord blessed the Sabbath day and      │",
          "  │   hallowed it.\"                                           │",
          "  │                                      — Exodus 20:8-11      │",
          "  │                                                             │",
          "  │  NAME: \"Lord\"                                             │",
          "  │  TITLE: \"Creator\"                                         │",
          "  │  TERRITORY: \"Heaven and earth\"                            │",
          "  │                                                             │",
          "  └─────────────────────────────────────────────────────────────┘",
          "",
          "The Sabbath contains God's name, title, and territory—a legal seal."
        ],
        scripture: "Exodus 20:8-11"
      },
      {
        title: "The Mark of the Beast",
        content: [
          "The mark of the beast is the opposite of the seal of God.",
          "It represents allegiance to a counterfeit system of worship.",
          "It will be enforced by a law requiring Sunday worship."
        ],
        scripture: "Revelation 13:16-17"
      },
      {
        title: "The Number 666",
        content: [
          "The number of the beast is 666—the number of a man.",
          "It represents human authority attempting to take the place of divine authority.",
          "It points to the papacy, which has claimed the power to change God's law."
        ],
        scripture: "Revelation 13:18"
      },
      {
        title: "The Forehead and the Hand",
        content: [
          "The mark is received in the forehead or in the hand.",
          "FOREHEAD: Represents the mind—intellectual acceptance.",
          "HAND: Represents actions—outward compliance.",
          "God wants our hearts, not just our actions."
        ],
        scripture: "Revelation 13:16, Revelation 14:9"
      },
      {
        title: "How to Avoid the Mark",
        content: [
          "The only way to avoid the mark is to receive the seal of God.",
          "We receive the seal by choosing to worship the Creator—by keeping His commandments, including the Sabbath.",
          "When the final test comes, those who have decided in advance to obey God will be protected."
        ],
        scripture: "Revelation 14:12, Revelation 7:3"
      }
    ],
    reflectionQuestions: [
      "What is the seal of God?",
      "What is the mark of the beast?",
      "What does the number 666 represent?",
      "What does 'forehead' and 'hand' represent?",
      "How can we avoid receiving the mark?"
    ],
    prayerPrompt: "Lord, seal me with Your Spirit. Help me to worship You as Creator by keeping Your commandments. Give me courage to stand for truth when the final test comes. Amen.",
    keyWords: [
      { word: "Seal of God", definition: "The Sabbath—a sign of God's authority" },
      { word: "Mark of the Beast", definition: "Sunday worship enforced by human authority" },
      { word: "666", definition: "The number of a man—human authority" }
    ],
    application: [
      "Choose today whom you will worship",
      "Receive the seal of God by keeping His commandments",
      "Prepare your heart for the final test"
    ],
    audioFile: "/audio/discover/lesson17.mp3"
  },
  18: {
    id: 18,
    title: "Third Angel's Message - The Image to the Beast (Part 3)",
    subtitle: "The final crisis explained",
    introduction: "The third angel warns about the image to the beast—a likeness of the papacy created in America. This image will enforce the mark of the beast, leading to the final crisis.",
    memoryVerse: "Revelation 13:14 - 'He deceives those who dwell on the earth by those signs which he was granted to do.'",
    sections: [
      {
        title: "The Image to the Beast",
        content: [
          "An image to the first beast will be created—a likeness of the papacy in America.",
          "This image will have the authority to cause those who refuse to worship it to be killed.",
          "It represents the union of church and state—religious laws enforced by civil power."
        ],
        scripture: "Revelation 13:14-15"
      },
      {
        title: "The Second Beast",
        content: [
          "The second beast rises from the earth—representing the United States.",
          "It has two horns like a lamb—representing the principles of republicanism and Protestantism.",
          "It speaks like a dragon—eventually becoming coercive and persecuting."
        ],
        scripture: "Revelation 13:11"
      },
      {
        title: "Diagram: The Two Beasts",
        content: [
          "",
          "  ┌─────────────────────────────────────────────────────────────┐",
          "  │                    THE TWO BEASTS                           │",
          "  ├─────────────────────────────────────────────────────────────┤",
          "  │                                                             │",
          "  │  FIRST BEAST (from the sea)                                 │",
          "  │  • Papal Rome                                               │",
          "  │  • Religious power                                          │",
          "  │  • Changed the Sabbath                                      │",
          "  │  • Persecuted God's people                                  │",
          "  │                                                             │",
          "  │  SECOND BEAST (from the earth)                              │",
          "  │  • United States                                            │",
          "  │  • Political power                                          │",
          "  │  • Appears like a lamb (Christian)                          │",
          "  │  • Speaks like a dragon (persecuting)                       │",
          "  │                                                             │",
          "  │  IMAGE TO THE BEAST                                         │",
          "  │  • A likeness of the papacy in America                      │",
          "  │  • Enforces Sunday worship                                  │",
          "  │                                                             │",
          "  └─────────────────────────────────────────────────────────────┘",
          "",
          "The two beasts work together to enforce false worship."
        ],
        scripture: "Revelation 13:1-18"
      },
      {
        title: "The Deadly Wound Healed",
        content: [
          "The first beast received a deadly wound—the papacy's loss of temporal power in 1798.",
          "The wound was healed—the papacy regained influence.",
          "The healed wound allows the beast to deceive the world again."
        ],
        scripture: "Revelation 13:3, 12"
      },
      {
        title: "The Deception",
        content: [
          "The second beast performs great signs—deceiving the world.",
          "It even makes fire come down from heaven—counterfeit miracles.",
          "The deception is so powerful that it would deceive even the elect, if possible."
        ],
        scripture: "Revelation 13:13-14, Matthew 24:24"
      },
      {
        title: "The Final Test",
        content: [
          "The final test is about worship—who will we worship?",
          "The issue is the Sabbath vs. Sunday—the seal of God vs. the mark of the beast.",
          "Those who keep God's commandments will be protected; those who don't will receive the mark."
        ],
        scripture: "Revelation 14:12, Revelation 13:16-17"
      }
    ],
    reflectionQuestions: [
      "What is the second beast of Revelation 13?",
      "What is the image to the beast?",
      "What is the deadly wound, and how is it healed?",
      "What will be the final test of loyalty?"
    ],
    prayerPrompt: "Lord, help me to be prepared for the final crisis. Give me courage to stand for truth, even when it's costly. Let me receive Your seal, not the mark of the beast. Amen.",
    keyWords: [
      { word: "Image to the Beast", definition: "A likeness of the papacy in America" },
      { word: "Deadly Wound", definition: "The papacy's loss of temporal power in 1798" },
      { word: "Final Test", definition: "Worship—Sabbath vs. Sunday" }
    ],
    application: [
      "Study Revelation 13 carefully",
      "Choose today whom you will worship",
      "Prepare your heart for the final crisis"
    ],
    audioFile: "/audio/discover/lesson18.mp3"
  },
  19: {
    id: 19,
    title: "Third Angel's Message - The Remnant (Part 4)",
    subtitle: "God's faithful people in the last days",
    introduction: "The third angel ends with a description of God's faithful people—the remnant. They keep the commandments of God and have the faith of Jesus. This is who God is calling us to be.",
    memoryVerse: "Revelation 14:12 - 'Here is the patience of the saints; here are those who keep the commandments of God and the faith of Jesus.'",
    sections: [
      {
        title: "The Characteristics of the Remnant",
        content: [
          "1. Keep the commandments of God—including the seventh-day Sabbath.",
          "2. Have the faith of Jesus—trusting in Him alone for salvation.",
          "3. Have the testimony of Jesus—the spirit of prophecy.",
          "4. Are patient—enduring trials without giving up."
        ],
        scripture: "Revelation 12:17, Revelation 14:12"
      },
      {
        title: "The Remnant in Prophecy",
        content: [
          "Throughout history, God has always had a faithful remnant.",
          "In Elijah's day, 7,000 had not bowed to Baal.",
          "In the last days, God will again have a remnant—those who remain faithful to Him."
        ],
        scripture: "1 Kings 19:18, Romans 11:5"
      },
      {
        title: "The Patience of the Saints",
        content: [
          "The remnant is characterized by patience—endurance under trial.",
          "They don't give up when things get hard.",
          "They trust God's timing and remain faithful to the end."
        ],
        scripture: "Revelation 14:12, Hebrews 10:36"
      },
      {
        title: "The Faith of Jesus",
        content: [
          "The remnant has the faith of Jesus—not just faith in Jesus.",
          "This means they trust God the way Jesus trusted the Father.",
          "It's a faith that obeys, even when it doesn't make sense."
        ],
        scripture: "Revelation 14:12, Galatians 2:20"
      },
      {
        title: "The Commandments of God",
        content: [
          "The remnant keeps God's commandments—all of them.",
          "This includes the seventh-day Sabbath, which most of the world has forgotten.",
          "Keeping the commandments is not legalism—it's love in action."
        ],
        scripture: "John 14:15, 1 John 5:3"
      }
    ],
    reflectionQuestions: [
      "What are the characteristics of the remnant?",
      "What does it mean to have the 'faith of Jesus'?",
      "Why is patience important for the remnant?",
      "How can you be part of God's remnant people?"
    ],
    prayerPrompt: "Lord, help me to be part of Your remnant people. Give me patience to endure trials. Help me to keep Your commandments out of love. Let me have the faith of Jesus. Amen.",
    keyWords: [
      { word: "Remnant", definition: "God's faithful people in the last days" },
      { word: "Patience", definition: "Endurance—not giving up under trial" },
      { word: "Faith of Jesus", definition: "Trusting God the way Jesus did" }
    ],
    application: [
      "Choose to be part of God's remnant",
      "Keep His commandments out of love",
      "Trust God the way Jesus did"
    ],
    audioFile: "/audio/discover/lesson19.mp3"
  },
  
  // app/group/[groupId]/study-hub/discover/lessonData.ts (continued - lessons 20-30)

  20: {
    id: 20,
    title: "God's Purpose in the Creation of Man",
    subtitle: "Created for His glory",
    introduction: "God created humanity for His glory—to reflect His character. Understanding our purpose gives meaning to life and direction to our choices. We are not accidents; we are the intentional creation of God.",
    memoryVerse: "Isaiah 43:7 - 'Everyone who is called by My name, whom I have created for My glory.'",
    sections: [
      {
        title: "Why Did God Create Man?",
        content: [
          "God created us for His glory—to reflect His character to the universe.",
          "We were created to have fellowship with God—to know Him and love Him.",
          "We were created to rule over God's creation—as stewards of His gifts.",
          "We were created to enjoy God forever—He is the source of all joy."
        ],
        scripture: "Isaiah 43:7, Revelation 4:11, Genesis 1:26-28"
      },
      {
        title: "What Does 'Glory' Mean?",
        content: [
          "Glory is God's character—His moral excellence and beauty.",
          "When Moses asked to see God's glory, God revealed His character: 'The Lord, the Lord God, merciful and gracious, longsuffering, and abounding in goodness and truth.'",
          "To give God glory means to reflect His character—to be like Him."
        ],
        scripture: "Exodus 33:18-19, Exodus 34:6-7"
      },
      {
        title: "Created in God's Image",
        content: [
          "We are created in the image of God—with intellect, emotion, and will.",
          "We have the capacity for reason, creativity, love, and relationship.",
          "The image of God was marred by sin but can be restored through Christ."
        ],
        scripture: "Genesis 1:26-27, Ephesians 4:24"
      },
      {
        title: "The Purpose of Life",
        content: [
          "Our primary purpose is to glorify God and enjoy Him forever.",
          "Everything we do—eating, drinking, working, playing—should be done for God's glory.",
          "When we fulfill our purpose, we experience true fulfillment and joy."
        ],
        scripture: "1 Corinthians 10:31, Psalm 16:11"
      },
      {
        title: "How We Reflect God's Character",
        content: [
          "We reflect God's character through the fruit of the Spirit—love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.",
          "We reflect God's character through obedience—keeping His commandments out of love.",
          "We reflect God's character through love for others—as He loved us."
        ],
        scripture: "Galatians 5:22-23, John 13:34-35"
      }
    ],
    reflectionQuestions: [
      "Why did God create man?",
      "What does 'glory' mean?",
      "What does it mean to be created in God's image?",
      "How can we reflect God's character today?"
    ],
    prayerPrompt: "Lord, thank You for creating me for Your glory. Help me to reflect Your character. Let my life bring glory to Your name. Amen.",
    keyWords: [
      { word: "Glory", definition: "God's character—His moral excellence" },
      { word: "Image of God", definition: "The qualities that make us like God" },
      { word: "Purpose", definition: "The reason for which we were created" }
    ],
    application: [
      "Live for God's glory today",
      "Reflect His character to those around you",
      "Find your purpose in knowing and glorifying God"
    ],
    audioFile: "/audio/discover/lesson20.mp3"
  },
  21: {
    id: 21,
    title: "The Temptation and Fall of Man",
    subtitle: "How sin entered the world",
    introduction: "Adam and Eve's fall teaches us about the nature of temptation and the consequences of sin. But God immediately provided a plan of redemption. The fall was not the end—it was the beginning of God's plan to save us.",
    memoryVerse: "Romans 5:12 - 'Through one man sin entered the world, and death through sin.'",
    sections: [
      {
        title: "The First Test",
        content: [
          "God gave Adam and Eve one command: not to eat from the tree of the knowledge of good and evil.",
          "This test was about trust—would they trust God's word or listen to the serpent?",
          "The tree was not evil in itself—it was a test of obedience."
        ],
        scripture: "Genesis 2:16-17"
      },
      {
        title: "Satan's Strategy",
        content: [
          "Satan approached Eve through the serpent—subtle and deceptive.",
          "He questioned God's word: 'Has God indeed said?'",
          "He denied God's warning: 'You will not surely die.'",
          "He misrepresented God's character: 'God knows that in the day you eat... you will be like God.'"
        ],
        scripture: "Genesis 3:1-5"
      },
      {
        title: "The Threefold Temptation",
        content: [
          "Eve saw that the tree was:",
          "1. Good for food—the lust of the flesh.",
          "2. Pleasant to the eyes—the lust of the eyes.",
          "3. Desirable to make one wise—the pride of life.",
          "The same three temptations that Satan used on Eve, he used on Jesus—and Jesus overcame."
        ],
        scripture: "Genesis 3:6, 1 John 2:16, Matthew 4:1-11"
      },
      {
        title: "The Fall",
        content: [
          "Eve ate, then gave to Adam, and he ate.",
          "Their eyes were opened—but not in the way they expected.",
          "They saw their nakedness and were ashamed—sin brought guilt and fear."
        ],
        scripture: "Genesis 3:6-7"
      },
      {
        title: "The Consequences",
        content: [
          "Separation from God—they hid from His presence.",
          "Broken relationships—Adam blamed Eve, Eve blamed the serpent.",
          "Cursed ground—work became toilsome.",
          "Pain and suffering—introduced into human experience.",
          "Death—physical and spiritual separation from God."
        ],
        scripture: "Genesis 3:8-19"
      },
      {
        title: "The First Gospel Promise",
        content: [
          "Immediately after the fall, God promised a Savior.",
          "The seed of the woman would crush the serpent's head.",
          "This is the first gospel promise—the protoevangelium."
        ],
        scripture: "Genesis 3:15"
      }
    ],
    reflectionQuestions: [
      "What was the first test for Adam and Eve?",
      "How did Satan tempt Eve?",
      "What were the three aspects of the temptation?",
      "What did God do in response to the fall?"
    ],
    prayerPrompt: "Lord, thank You for not abandoning us after the fall. Thank You for the promise of a Savior. Help me to resist temptation as Jesus did. Amen.",
    keyWords: [
      { word: "Temptation", definition: "An enticement to sin—not sin itself" },
      { word: "Fall", definition: "The entrance of sin into the human race" },
      { word: "Protoevangelium", definition: "The first gospel promise—Genesis 3:15" }
    ],
    application: [
      "Recognize Satan's tactics—questioning God's word, misrepresenting His character",
      "Resist temptation as Jesus did—with Scripture",
      "Thank God for the promise of a Savior"
    ],
    audioFile: "/audio/discover/lesson21.mp3"
  },
  22: {
    id: 22,
    title: "The Mind of Man",
    subtitle: "The battlefield of the soul",
    introduction: "The battle for our soul is fought in the mind. Understanding how the mind works helps us cooperate with God's transforming power. The carnal mind is enmity against God, but the mind surrendered to Christ is transformed.",
    memoryVerse: "Philippians 2:5 - 'Let this mind be in you which was also in Christ Jesus.'",
    sections: [
      {
        title: "The Two Natures",
        content: [
          "Every person has two natures: the flesh (carnal nature) and the spirit (new nature in Christ).",
          "The carnal mind is hostile to God—it does not submit to His law.",
          "The spiritual mind is set on God—it seeks to please Him.",
          "The battle between these two natures continues throughout the Christian life."
        ],
        scripture: "Romans 7:14-25, Galatians 5:17"
      },
      {
        title: "The Carnal Mind",
        content: [
          "The carnal mind is characterized by:",
          "• Selfishness—putting self first.",
          "• Pride—thinking more highly of oneself than one ought.",
          "• Rebellion—resisting God's authority.",
          "• Worldliness—loving the things of the world.",
          "The carnal mind cannot please God."
        ],
        scripture: "Romans 8:7-8"
      },
      {
        title: "The Spiritual Mind",
        content: [
          "The spiritual mind is characterized by:",
          "• Love for God—delighting in His commandments.",
          "• Humility—recognizing dependence on God.",
          "• Submission—yielding to God's will.",
          "• Heavenly-mindedness—setting affections on things above.",
          "The spiritual mind has peace with God."
        ],
        scripture: "Romans 8:6"
      },
      {
        title: "The Renewing of the Mind",
        content: [
          "We are transformed by the renewing of our minds.",
          "This happens through:",
          "• The Word of God—washing and renewing our thoughts.",
          "• Prayer—aligning our minds with God's will.",
          "• Meditation—focusing on what is true, noble, just, pure, lovely.",
          "The mind is the battlefield—where the war is won or lost."
        ],
        scripture: "Romans 12:2, Philippians 4:8"
      },
      {
        title: "Guarding the Mind",
        content: [
          "We must guard our minds against harmful influences.",
          "What we watch, read, and listen to shapes our thoughts.",
          "We must take every thought captive to the obedience of Christ.",
          "The mind is like a garden—if we don't plant good seeds, weeds will grow."
        ],
        scripture: "2 Corinthians 10:5, Proverbs 4:23"
      }
    ],
    reflectionQuestions: [
      "What are the two natures that battle within us?",
      "What is the 'carnal mind'?",
      "How is the mind renewed?",
      "How can we guard our minds?"
    ],
    prayerPrompt: "Lord, renew my mind. Help me to think on what is true, noble, just, pure, lovely, and of good report. Take every thought captive to obey Christ. Amen.",
    keyWords: [
      { word: "Carnal Mind", definition: "The sinful nature—hostile to God" },
      { word: "Spiritual Mind", definition: "The renewed mind—set on God" },
      { word: "Renewing", definition: "The process of being transformed by God's Word" }
    ],
    application: [
      "Guard what you watch, read, and listen to",
      "Renew your mind daily through God's Word",
      "Take every thought captive to Christ"
    ],
    audioFile: "/audio/discover/lesson22.mp3"
  },
  23: {
    id: 23,
    title: "The Hope of Glory",
    subtitle: "Christ in you",
    introduction: "Christ in you is the hope of glory. Through faith, we can be transformed into the image of God, reflecting His character to the world. This is the great hope of the gospel—not just forgiveness, but transformation.",
    memoryVerse: "Colossians 1:27 - 'Christ in you, the hope of glory.'",
    sections: [
      {
        title: "The Mystery Revealed",
        content: [
          "The mystery hidden for ages is now revealed: Christ in you, the hope of glory.",
          "God's plan is not just to save us from sin, but to live in us.",
          "Christ dwells in our hearts through faith—making His home in us."
        ],
        scripture: "Colossians 1:26-27, Ephesians 3:17"
      },
      {
        title: "The Hope of Glory",
        content: [
          "Glory is God's character—His moral excellence and beauty.",
          "The hope of glory is that we will be transformed into His image.",
          "We are being changed from glory to glory—becoming more like Christ."
        ],
        scripture: "2 Corinthians 3:18, Romans 8:29-30"
      },
      {
        title: "Beholding and Becoming",
        content: [
          "We are transformed by beholding Jesus—fixing our eyes on Him.",
          "As we look at Him, we become like Him.",
          "This is not self-improvement—it's Spirit-enabled transformation."
        ],
        scripture: "2 Corinthians 3:18, Hebrews 12:2"
      },
      {
        title: "The Process of Transformation",
        content: [
          "Transformation is not instantaneous—it's a lifelong process.",
          "It happens as we spend time with Jesus through His Word and prayer.",
          "It happens as we obey Him—putting off the old self and putting on the new.",
          "It happens as we share our faith—reaching out to others."
        ],
        scripture: "Ephesians 4:22-24, Colossians 3:9-10"
      },
      {
        title: "The Goal of Transformation",
        content: [
          "The goal is to be conformed to the image of Christ.",
          "We are predestined to be conformed to His likeness.",
          "One day, we will be like Him—for we shall see Him as He is."
        ],
        scripture: "Romans 8:29, 1 John 3:2"
      }
    ],
    reflectionQuestions: [
      "Why did God create man?",
      "What is the gospel?",
      "How are we changed into God's image?",
      "What is the hope of glory?"
    ],
    prayerPrompt: "Lord, let Christ dwell in my heart through faith. Transform me into Your image from glory to glory. Let me reflect Your character to the world. Amen.",
    keyWords: [
      { word: "Glory", definition: "God's character—His moral excellence" },
      { word: "Transformation", definition: "Being changed into Christ's image" },
      { word: "Beholding", definition: "Looking at Jesus—the source of transformation" }
    ],
    application: [
      "Spend time beholding Jesus daily",
      "Cooperate with the Spirit's transforming work",
      "Look forward to the day when you will be like Him"
    ],
    audioFile: "/audio/discover/lesson23.mp3"
  },
  24: {
    id: 24,
    title: "The Science of Faith",
    subtitle: "How faith works",
    introduction: "Faith is not a leap in the dark. It is based on evidence—the Word of God, which has creative power to change our lives. Faith is the assurance of things hoped for, the conviction of things not seen.",
    memoryVerse: "Romans 10:17 - 'Faith comes by hearing, and hearing by the word of God.'",
    sections: [
      {
        title: "What Is Faith?",
        content: [
          "Faith is the substance of things hoped for—the assurance that what God promised will come true.",
          "Faith is the evidence of things not seen—conviction based on God's Word, not on physical proof.",
          "Faith is not blind—it's based on the character and promises of God."
        ],
        scripture: "Hebrews 11:1"
      },
      {
        title: "The Source of Faith",
        content: [
          "Faith comes from hearing the Word of God.",
          "The more we read and study Scripture, the more our faith grows.",
          "Faith is a gift from God—but it grows as we exercise it."
        ],
        scripture: "Romans 10:17, Ephesians 2:8"
      },
      {
        title: "The Power of God's Word",
        content: [
          "God's Word has creative power—He spoke, and the universe came into being.",
          "His Word is living and active—it has power to change our lives.",
          "When we believe and act on God's Word, we tap into His creative power."
        ],
        scripture: "Psalm 33:6-9, Hebrews 4:12"
      },
      {
        title: "Faith and Feelings",
        content: [
          "Faith is not based on feelings—it's based on God's Word.",
          "Feelings change, but God's Word never changes.",
          "We must believe God's Word even when we don't feel like it.",
          "Feelings follow faith—not the other way around."
        ],
        scripture: "2 Corinthians 5:7, Romans 4:18-21"
      },
      {
        title: "Faith in Action",
        content: [
          "Faith without works is dead—true faith produces action.",
          "Abraham believed God, and it was counted as righteousness—and his faith was demonstrated by his works.",
          "We are saved by faith alone, but saving faith is never alone."
        ],
        scripture: "James 2:14-26"
      }
    ],
    reflectionQuestions: [
      "What is faith based on?",
      "What are the characteristics of God's Word?",
      "How does faith work?",
      "How can we grow our faith?"
    ],
    prayerPrompt: "Lord, increase my faith. Help me to trust Your Word even when I don't see the results. Let my faith be demonstrated by my actions. Amen.",
    keyWords: [
      { word: "Faith", definition: "Trust in God's Word—assurance of things hoped for" },
      { word: "Substance", definition: "The reality behind what we hope for" },
      { word: "Evidence", definition: "Conviction based on God's promises" }
    ],
    application: [
      "Feed your faith with God's Word daily",
      "Act on what you believe—faith works through love",
      "Trust God's Word even when feelings disagree"
    ],
    audioFile: "/audio/discover/lesson24.mp3"
  },
  25: {
    id: 25,
    title: "Conversion (Part 1)",
    subtitle: "The new birth explained",
    introduction: "Conversion is a radical change—a death to self and a new life in Christ. It is not self-improvement but a transformation of nature. When we are converted, we become new creations.",
    memoryVerse: "2 Corinthians 5:17 - 'If anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.'",
    sections: [
      {
        title: "What Is Conversion?",
        content: [
          "Conversion means to turn around—to change direction.",
          "It is a radical change of heart—the very drift of the mind and bent of the heart are turned.",
          "It is not just turning from sin—it's turning to God.",
          "Conversion is not self-improvement—it's death to self and new life in Christ."
        ],
        scripture: "Acts 3:19, Acts of the Apostles p.262"
      },
      {
        title: "The New Birth",
        content: [
          "Jesus told Nicodemus, 'You must be born again.'",
          "The new birth is not physical—it's spiritual.",
          "It's a transformation of nature—new thoughts, new feelings, new motives.",
          "It's being born of water (baptism) and the Spirit."
        ],
        scripture: "John 3:3-8"
      },
      {
        title: "The Characteristics of Conversion",
        content: [
          "A converted person:",
          "• Delights in God's law (Psalm 40:8).",
          "• Loves God's commandments (Psalm 119:35).",
          "• Has a new heart (Ezekiel 36:26).",
          "• Walks in newness of life (Romans 6:4).",
          "• Bears the fruit of the Spirit (Galatians 5:22-23)."
        ],
        scripture: "Psalm 40:8, Ezekiel 36:26"
      },
      {
        title: "Examples of Conversion",
        content: [
          "Peter—from impetuous fisherman to bold preacher.",
          "Paul—from persecutor to apostle.",
          "The Samaritan woman—from outcast to evangelist.",
          "Zacchaeus—from tax collector to generous giver."
        ],
        scripture: "Luke 5:1-11, Acts 9:1-22, John 4:1-42, Luke 19:1-10"
      },
      {
        title: "The Evidence of Conversion",
        content: [
          "The evidence of conversion is not feelings—it's fruit.",
          "A converted person loves God and loves others.",
          "They keep God's commandments—not to be saved, but because they are saved.",
          "They have a changed life—old things have passed away."
        ],
        scripture: "Matthew 7:16-20, 1 John 4:7-8"
      }
    ],
    reflectionQuestions: [
      "What is conversion?",
      "What are the characteristics of a person experiencing conversion?",
      "What are biblical examples of conversion?",
      "What is the evidence of true conversion?"
    ],
    prayerPrompt: "Lord, convert my heart. Give me a new heart and a new spirit. Let me be born again—not just in water, but in Spirit. Transform me into a new creation. Amen.",
    keyWords: [
      { word: "Conversion", definition: "A radical change of direction—turning to God" },
      { word: "New Birth", definition: "Spiritual rebirth—becoming a new creation" },
      { word: "Repentance", definition: "A change of mind that leads to a change of direction" }
    ],
    application: [
      "Examine your heart—have you been converted?",
      "Ask God to give you a new heart",
      "Let the fruit of the Spirit be evident in your life"
    ],
    audioFile: "/audio/discover/lesson25.mp3"
  },
  26: {
    id: 26,
    title: "Conversion (Part 2) - Romans 6",
    subtitle: "Dead to sin, alive to God",
    introduction: "Romans 6 teaches us that we must die to self before we can live for Christ. Baptism symbolizes this death and resurrection. We are no longer slaves to sin—we are slaves to righteousness.",
    memoryVerse: "Romans 6:11 - 'Reckon yourselves to be dead indeed to sin, but alive to God in Christ Jesus our Lord.'",
    sections: [
      {
        title: "Dead to Sin, Alive to God",
        content: [
          "Paul asks: 'How shall we who died to sin live any longer in it?'",
          "When we are converted, we die to sin—it no longer has dominion over us.",
          "We are not sinless, but we sin less—and when we sin, we have an Advocate."
        ],
        scripture: "Romans 6:1-2"
      },
      {
        title: "Baptism into Death",
        content: [
          "Baptism symbolizes death, burial, and resurrection.",
          "Going under the water represents being buried with Christ.",
          "Coming up represents being raised to walk in newness of life.",
          "Our old self was crucified with Christ—so that the body of sin might be done away with."
        ],
        scripture: "Romans 6:3-6"
      },
      {
        title: "Reckoning Ourselves Dead",
        content: [
          "Paul tells us to 'reckon' ourselves dead to sin.",
          "Reckoning means to count it as true—to act on what God says.",
          "Even when we feel alive to sin, we must believe God's Word that we are dead to it.",
          "This is faith—believing God's Word over our feelings."
        ],
        scripture: "Romans 6:11"
      },
      {
        title: "Do Not Let Sin Reign",
        content: [
          "We have a choice: we can let sin reign, or we can let righteousness reign.",
          "Sin no longer has to master us—we are under grace.",
          "We must present ourselves to God as instruments of righteousness."
        ],
        scripture: "Romans 6:12-14"
      },
      {
        title: "Slaves to Righteousness",
        content: [
          "Before conversion, we were slaves to sin.",
          "After conversion, we become slaves to righteousness.",
          "The fruit of sin is death; the fruit of righteousness is eternal life.",
          "The gift of God is eternal life through Jesus Christ our Lord."
        ],
        scripture: "Romans 6:15-23"
      }
    ],
    reflectionQuestions: [
      "What is the repeated theme in Romans 6:1-13?",
      "How are we to 'die' to the old man?",
      "What is the 'seed' needed for conversion?",
      "How can we 'walk in newness of life'?"
    ],
    prayerPrompt: "Lord, I reckon myself dead to sin and alive to You. Help me to present myself to You as an instrument of righteousness. Let sin no longer reign in my mortal body. Amen.",
    keyWords: [
      { word: "Reckon", definition: "To count as true—to act on what God says" },
      { word: "Crucified", definition: "Put to death—the old self is dead" },
      { word: "Newness of Life", definition: "The transformed life that follows conversion" }
    ],
    application: [
      "Reckon yourself dead to sin today",
      "Present yourself to God as an instrument of righteousness",
      "Don't let sin reign in your body"
    ],
    audioFile: "/audio/discover/lesson26.mp3"
  },
  27: {
    id: 27,
    title: "Genuine Conversion",
    subtitle: "The work of the Holy Spirit",
    introduction: "Genuine conversion is a work of the Holy Spirit that transforms the heart. It is not a change of habits but a change of nature. Only God can convert the heart—we cannot convert ourselves.",
    memoryVerse: "John 3:3 - 'Unless one is born again, he cannot see the kingdom of God.'",
    sections: [
      {
        title: "The Work of the Holy Spirit",
        content: [
          "The Holy Spirit is the agent of conversion—He convicts, converts, and transforms.",
          "No one can say 'Jesus is Lord' except by the Holy Spirit.",
          "The Spirit works through the Word—the seed that produces new life."
        ],
        scripture: "John 16:8, 1 Corinthians 12:3, 1 Peter 1:23"
      },
      {
        title: "The Wind of the Spirit",
        content: [
          "Jesus compared the Spirit to the wind—you can't see it, but you see its effects.",
          "We can't control the Spirit or fully understand His work, but we can see the transformation.",
          "Some conversions are sudden; others are gradual. We can't always pinpoint the exact moment, but we see the change."
        ],
        scripture: "John 3:8"
      },
      {
        title: "The Word as Seed",
        content: [
          "The Word of God is the seed that produces new life.",
          "When the Word is planted in a receptive heart, it germinates and grows.",
          "The Spirit uses the Word to convict, convert, and transform."
        ],
        scripture: "1 Peter 1:23, Luke 8:11"
      },
      {
        title: "The New Heart",
        content: [
          "God promises to give us a new heart and a new spirit.",
          "He will remove the heart of stone and give us a heart of flesh.",
          "This is not self-improvement—it's a miracle of grace."
        ],
        scripture: "Ezekiel 36:26-27"
      },
      {
        title: "The Evidence of Genuine Conversion",
        content: [
          "Love for God—delighting in His commandments.",
          "Love for others—caring for the needs of others.",
          "Hatred for sin—turning away from what displeases God.",
          "Desire for holiness—wanting to be like Jesus.",
          "Fruit of the Spirit—love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control."
        ],
        scripture: "1 John 2:3-6, Galatians 5:22-23"
      }
    ],
    reflectionQuestions: [
      "What does it mean to be born again?",
      "How does the Holy Spirit work in conversion?",
      "What is the role of Scripture?",
      "What is the evidence of genuine conversion?"
    ],
    prayerPrompt: "Lord, give me a new heart and a new spirit. Remove my heart of stone and give me a heart of flesh. Let Your Spirit transform me from the inside out. Amen.",
    keyWords: [
      { word: "Regeneration", definition: "The new birth—being born again" },
      { word: "Conviction", definition: "The Spirit's work of showing us our sin" },
      { word: "Transformation", definition: "Being changed from the inside out" }
    ],
    application: [
      "Ask the Spirit to convict and convert you",
      "Plant the seed of God's Word in your heart",
      "Look for evidence of genuine conversion in your life"
    ],
    audioFile: "/audio/discover/lesson27.mp3"
  },
  28: {
    id: 28,
    title: "Sanctification by Faith (Part 1)",
    subtitle: "The work of a lifetime",
    introduction: "Sanctification is the work of a lifetime—growing in grace and being conformed to the image of Christ through the power of the Spirit. It is not instantaneous—it's a lifelong process.",
    memoryVerse: "1 Thessalonians 4:3 - 'This is the will of God, your sanctification.'",
    sections: [
      {
        title: "What Is Sanctification?",
        content: [
          "Sanctification means being made holy—set apart for God's purposes.",
          "It is the work of the Holy Spirit in our lives, transforming us into Christ's image.",
          "While justification is instantaneous, sanctification is a lifelong process.",
          "We are not saved by sanctification—but sanctification is evidence of salvation."
        ],
        scripture: "1 Thessalonians 4:3, 2 Corinthians 3:18"
      },
      {
        title: "The Means of Sanctification",
        content: [
          "The Word of God—sanctify them by Your truth; Your word is truth.",
          "The Holy Spirit—we are being transformed by the Spirit.",
          "Prayer—communion with God changes us.",
          "Fellowship—growing together with other believers.",
          "Trials—suffering produces character."
        ],
        scripture: "John 17:17, 2 Corinthians 3:18, Romans 5:3-5"
      },
      {
        title: "Paul's Struggle in Romans 7",
        content: [
          "Paul describes the struggle: 'For what I will to do, that I do not practice; but what I hate, that I do.'",
          "This is the battle between the flesh and the spirit.",
          "Sanctification is not the absence of struggle—it's progress in the midst of struggle."
        ],
        scripture: "Romans 7:14-25"
      },
      {
        title: "The Role of the Law in Sanctification",
        content: [
          "The law shows us God's character—it reveals what holiness looks like.",
          "The law cannot save us—but it guides us in the path of holiness.",
          "Sanctification is not about keeping rules—it's about loving God and loving others."
        ],
        scripture: "Romans 7:12, Galatians 5:14"
      },
      {
        title: "The Goal of Sanctification",
        content: [
          "The goal is to be conformed to the image of Christ.",
          "We are being changed from glory to glory—becoming more like Him.",
          "One day, we will be like Him—for we shall see Him as He is."
        ],
        scripture: "Romans 8:29, 2 Corinthians 3:18, 1 John 3:2"
      }
    ],
    reflectionQuestions: [
      "What is sanctification?",
      "How can we be sanctified?",
      "What is Paul's struggle in Romans 7?",
      "What is the goal of sanctification?"
    ],
    prayerPrompt: "Lord, sanctify me by Your truth. Your word is truth. Transform me into Your image from glory to glory. Help me to grow in grace every day. Amen.",
    keyWords: [
      { word: "Sanctification", definition: "The process of becoming more like Christ" },
      { word: "Holiness", definition: "Being set apart for God's purposes" },
      { word: "Conformed", definition: "Being shaped into Christ's image" }
    ],
    application: [
      "Cooperate with the Spirit's sanctifying work",
      "Feed on God's Word daily—it sanctifies",
      "Be patient—sanctification is a lifelong process"
    ],
    audioFile: "/audio/discover/lesson28.mp3"
  },
  29: {
    id: 29,
    title: "Sanctification by Faith (Part 2) - Romans 8",
    subtitle: "Walking in the Spirit",
    introduction: "Romans 8 reveals the secret of victory—walking in the Spirit, not in the flesh. Those who are in Christ are free from condemnation. The Spirit gives life and empowers us to overcome sin.",
    memoryVerse: "Romans 8:1 - 'There is therefore now no condemnation to those who are in Christ Jesus.'",
    sections: [
      {
        title: "No Condemnation",
        content: [
          "There is no condemnation for those who are in Christ Jesus.",
          "This doesn't mean we never sin—it means we are not condemned when we do.",
          "Our condemnation was taken by Jesus on the cross.",
          "When we sin, we have an Advocate—Jesus Christ the righteous."
        ],
        scripture: "Romans 8:1, 1 John 2:1"
      },
      {
        title: "The Law of the Spirit of Life",
        content: [
          "The law of the Spirit of life has set us free from the law of sin and death.",
          "We are no longer slaves to sin—the Spirit gives us power to overcome.",
          "What the law could not do (because of our weak flesh), God did by sending His Son."
        ],
        scripture: "Romans 8:2-4"
      },
      {
        title: "Walking in the Spirit",
        content: [
          "Those who live according to the flesh set their minds on the things of the flesh.",
          "Those who live according to the Spirit set their minds on the things of the Spirit.",
          "The mind of the flesh is death; the mind of the Spirit is life and peace.",
          "We overcome sin not by trying harder, but by walking in the Spirit."
        ],
        scripture: "Romans 8:5-8"
      },
      {
        title: "Led by the Spirit",
        content: [
          "Those who are led by the Spirit are the children of God.",
          "We have not received a spirit of fear—but the Spirit of adoption.",
          "The Spirit Himself bears witness with our spirit that we are children of God."
        ],
        scripture: "Romans 8:14-16"
      },
      {
        title: "More Than Conquerors",
        content: [
          "If God is for us, who can be against us?",
          "He who did not spare His own Son will freely give us all things.",
          "In all these things, we are more than conquerors through Him who loved us.",
          "Nothing can separate us from the love of God in Christ Jesus."
        ],
        scripture: "Romans 8:31-39"
      }
    ],
    reflectionQuestions: [
      "What does it mean to be 'in Christ'?",
      "What is the difference between carnal and spiritual mind?",
      "How do we mortify the deeds of the body?",
      "What assurance do we have in Romans 8?"
    ],
    prayerPrompt: "Lord, help me to walk in the Spirit, not in the flesh. Let me set my mind on the things of the Spirit. Thank You that nothing can separate me from Your love. Amen.",
    keyWords: [
      { word: "Condemnation", definition: "The sentence of guilt—removed in Christ" },
      { word: "Flesh", definition: "The sinful nature—hostile to God" },
      { word: "Spirit", definition: "The Holy Spirit—our source of power" }
    ],
    application: [
      "Walk in the Spirit—not in the flesh",
      "Set your mind on things above",
      "Rest in the assurance that nothing can separate you from God's love"
    ],
    audioFile: "/audio/discover/lesson29.mp3"
  },
  30: {
    id: 30,
    title: "Victory Over Sin",
    subtitle: "Living the abundant life",
    introduction: "Victory over sin is not achieved by human effort but by faith in Christ. Through His power, we can overcome any temptation. This is not sinless perfection—but victory over known sin.",
    memoryVerse: "1 John 5:4 - 'This is the victory that has overcome the world—our faith.'",
    sections: [
      {
        title: "The Promise of Victory",
        content: [
          "God promises victory over sin—not just forgiveness, but freedom.",
          "Sin shall not have dominion over you—you are under grace, not law.",
          "Thanks be to God, who gives us the victory through our Lord Jesus Christ."
        ],
        scripture: "Romans 6:14, 1 Corinthians 15:57"
      },
      {
        title: "The Process of Sin",
        content: [
          "James describes the process: temptation → lust → enticed → sin → death.",
          "Victory comes when we resist at the first stage—before lust conceives.",
          "The longer we entertain temptation, the harder it is to resist."
        ],
        scripture: "James 1:14-15"
      },
      {
        title: "How to Overcome Temptation",
        content: [
          "Submit to God—surrender your will to Him.",
          "Resist the devil—he will flee from you.",
          "Draw near to God—He will draw near to you.",
          "Use the Word of God—as Jesus did in the wilderness.",
          "Pray—watch and pray, lest you enter into temptation."
        ],
        scripture: "James 4:7-8, Matthew 26:41"
      },
      {
        title: "God's Promises for Overcoming",
        content: [
          "God is faithful—He will not allow you to be tempted beyond what you are able.",
          "With the temptation, He will provide a way of escape.",
          "We can do all things through Christ who strengthens us."
        ],
        scripture: "1 Corinthians 10:13, Philippians 4:13"
      },
      {
        title: "What to Do When You Fall",
        content: [
          "If we confess our sins, He is faithful and just to forgive us.",
          "Don't let the enemy keep you in guilt—confess and receive forgiveness.",
          "Get back up and keep walking. The righteous man falls seven times and rises again."
        ],
        scripture: "1 John 1:9, Proverbs 24:16"
      },
      {
        title: "The Abundant Life",
        content: [
          "Jesus came that we might have life, and have it more abundantly.",
          "Victory over sin is not about restriction—it's about liberation.",
          "The abundant life is a life of freedom, joy, and purpose in Christ."
        ],
        scripture: "John 10:10"
      }
    ],
    reflectionQuestions: [
      "How do we gain victory over sin?",
      "What is the process of sinning?",
      "How do we overcome temptation?",
      "What should we do when we fall?"
    ],
    prayerPrompt: "Lord, thank You for the victory You have won for me. Help me to resist temptation and to walk in freedom. When I fall, help me to confess quickly and receive Your forgiveness. I want to live the abundant life in You. Amen.",
    keyWords: [
      { word: "Victory", definition: "Overcoming sin through Christ's power" },
      { word: "Temptation", definition: "An enticement to sin—not sin itself" },
      { word: "Way of Escape", definition: "The path God provides to avoid yielding to temptation" }
    ],
    application: [
      "Resist temptation at the first stage",
      "Use God's promises to overcome",
      "Confess quickly when you fall",
      "Live the abundant life in Christ"
    ],
    audioFile: "/audio/discover/lesson30.mp3"
  }
};



