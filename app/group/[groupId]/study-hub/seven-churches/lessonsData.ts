// study-hub/seven-churches/lessonsData.ts
// Complete Seven Churches of Revelation Study Data

export interface Section {
  title: string;
  content: string[];
  scripture?: string;
  reflection?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface LessonData {
  id: number;
  title: string;
  church: string;
  era: string;
  dates: string;
  introduction: string;
  background: {
    city: string;
    history: string;
    geography: string;
    spiritualContext: string;
  };
  sections: Section[];
  keyVerses: string[];
  reflectionQuestions: string[];
  prayerPrompt: string;
  keyWords: { word: string; definition: string }[];
}

export const sevenChurchesData: Record<number, LessonData> = {
  1: {
    id: 1,
    title: "Introduction to the Seven Churches",
    church: "Overview",
    era: "All Eras",
    dates: "1st Century - Present",
    introduction: "The book of Revelation opens with a magnificent vision of Jesus Christ walking among seven golden lampstands. These lampstands represent seven churches in Asia Minor—real congregations with real challenges, but also prophetic symbols pointing to seven periods of church history. Jesus' messages to these churches are love letters from heaven, offering correction, encouragement, and hope to His people throughout the ages.",
    background: {
      city: "Patmos Island",
      history: "The apostle John was exiled to Patmos during the reign of Emperor Domitian (AD 81-96) for his faithful witness. It was there that he received this revelation.",
      geography: "A small rocky island in the Aegean Sea, about 10 miles long and 5-6 miles wide, used by Rome as a penal colony.",
      spiritualContext: "Christians faced severe persecution under Domitian, who demanded worship as 'Lord and God'. John was isolated but not abandoned—Jesus met him in his solitude."
    },
    sections: [
      {
        title: "A Love Letter from Heaven",
        content: [
          "The Revelation of Jesus Christ, which God gave Him to show His servants—things which must shortly take place. (Revelation 1:1)",
          "This book is not about beasts and plagues first—it is about Jesus. Before any judgment is revealed, the glorified Christ appears in priestly garments, walking among the lampstands.",
          "The seven churches were literal congregations in Asia Minor (modern-day Turkey), but they also represent seven periods of church history from the apostolic age to the end of time."
        ],
        scripture: "Revelation 1:1-3"
      },
      {
        title: "The Divine Author: Jesus Christ Revealed",
        content: [
          "John describes the risen Christ in breathtaking detail:",
          "• Clothed with a garment down to the feet—priestly attire",
          "• Girded with a golden band—royal authority",
          "• Head and hair white as wool—divine wisdom and eternity",
          "• Eyes like a flame of fire—penetrating judgment",
          "• Feet like fine brass—unwavering justice",
          "• Voice as many waters—overwhelming authority",
          "• Seven stars in His right hand—the messengers of the churches",
          "• Sharp two-edged sword from His mouth—the Word of God",
          "• Countenance like the sun—divine glory"
        ],
        scripture: "Revelation 1:12-16"
      },
      {
        title: "The Pattern of Each Message",
        content: [
          "Each letter follows a consistent pattern:",
          "1. Salutation to the angel (messenger) of the church",
          "2. Christ's self-designation—drawn from the vision in chapter 1",
          "3. Commendation—'I know your works'",
          "4. Complaint—where correction is needed",
          "5. Counsel—warning and exhortation",
          "6. Promise—'To him who overcomes'",
          "7. Invitation—'He who has an ear, let him hear'"
        ],
        table: {
          headers: ["Church", "Self-Designation", "Key Issue", "Promise"],
          rows: [
            ["Ephesus", "Holds the seven stars", "Left first love", "Tree of Life"],
            ["Smyrna", "First and Last, who died and lived", "Persecution", "Crown of Life"],
            ["Pergamos", "Sharp two-edged sword", "False doctrine", "Hidden manna"],
            ["Thyatira", "Eyes like fire, feet like brass", "Jezebel", "Power over nations"],
            ["Sardis", "Seven Spirits and seven stars", "Dead works", "White garments"],
            ["Philadelphia", "Key of David", "Little strength", "Pillar in temple"],
            ["Laodicea", "Amen, Faithful Witness", "Lukewarm", "Share His throne"]
          ]
        }
      },
      {
        title: "The Blessed Hope",
        content: [
          "Blessed is he who reads and those who hear the words of this prophecy, and keep those things which are written in it; for the time is near. (Revelation 1:3)",
          "Seven times in Revelation we find the promise of blessing for those who read, hear, and keep the words of this prophecy.",
          "The purpose of Revelation is not to frighten, but to prepare—to give us hope, courage, and comfort, knowing that even in turmoil, Jesus is in control."
        ]
      }
    ],
    keyVerses: ["Revelation 1:8", "Revelation 1:17-18", "Revelation 1:20"],
    reflectionQuestions: [
      "How does John's vision of Jesus change your perception of Christ?",
      "Why is it significant that Jesus walks among the lampstands?",
      "What does it mean to 'keep' the words of this prophecy?",
      "How can this introduction give you hope in difficult times?"
    ],
    prayerPrompt: "Lord Jesus, open my eyes to see You as You truly are—the risen, glorified, sovereign King. Help me to hear what the Spirit is saying to Your church today. Amen.",
    keyWords: [
      { word: "Lampstand", definition: "Symbol of the church—called to be light in a dark world" },
      { word: "Stars", definition: "Angels or messengers of the churches—God's appointed leaders" },
      { word: "Alpha and Omega", definition: "The first and last letters of the Greek alphabet—signifying Jesus as the beginning and end of all things" },
      { word: "Son of Man", definition: "Jesus' favorite self-designation, linking to Daniel's vision of the heavenly Judge" }
    ]
  },
  2: {
    id: 2,
    title: "Ephesus: The Passionless Church",
    church: "Ephesus",
    era: "Apostolic Era",
    dates: "31-100 AD",
    introduction: "Ephesus was the leading city of Asia Minor, home to the magnificent temple of Artemis—one of the Seven Wonders of the Ancient World. Paul spent three years here, and Timothy later pastored this church. The believers had labored tirelessly, tested false apostles, and endured hardship—but somewhere along the way, they lost their first love.",
    background: {
      city: "Ephesus",
      history: "A wealthy port city with a population of 225,000. The temple of Artemis (Diana) was 4 times larger than the Parthenon. Paul's ministry here caused a riot among silversmiths (Acts 19).",
      geography: "Located where the Cayster River empties into the Aegean Sea. Today, silt has filled the harbor, leaving ruins on a swampy plain.",
      spiritualContext: "The church was doctrinally sound, tested false teachers, and endured persecution—but their service had become mechanical, lacking the warmth of genuine love for Christ."
    },
    sections: [
      {
        title: "Christ's Self-Designation",
        content: [
          "“These things says He who holds the seven stars in His right hand, who walks in the midst of the seven golden lampstands.” (Revelation 2:1)",
          "Jesus reminds Ephesus that He holds their leaders (stars) in His hand and walks among them. He is not distant—He is present, observing, and involved."
        ],
        reflection: ["What does it mean that Jesus holds the leaders in His hand? How does this comfort you?"]
      },
      {
        title: "What Jesus Commended",
        content: [
          "I know your works, your labor, your patience, and that you cannot bear those who are evil. And you have tested those who say they are apostles and are not, and have found them liars; and you have persevered and have patience, and have labored for My name's sake and have not become weary. (Revelation 2:2-3)",
          "Seven things Jesus commends:",
          "✓ Works—active service",
          "✓ Labor—toil and effort",
          "✓ Patience—endurance under trial",
          "✓ Intolerance of evil—doctrinal purity",
          "✓ Testing false apostles—discernment",
          "✓ Perseverance—continued faithfulness",
          "✓ Hatred of Nicolaitan deeds—rejecting compromise"
        ],
        scripture: "Revelation 2:2-3, 6"
      },
      {
        title: "What Jesus Condemned",
        content: [
          "Nevertheless I have this against you, that you have left your first love. (Revelation 2:4)",
          "With all their orthodoxy and activity, something was missing—their love for Christ had grown cold.",
          "They were still doing the right things, but for the wrong reasons—out of duty rather than devotion.",
          "The church had become a well-oiled machine, but the fire had gone out."
        ],
        reflection: [
          "What does 'first love' mean to you?",
          "Is it possible to be active in church and still have lost your first love?",
          "What are some causes of losing your first love?"
        ]
      },
      {
        title: "The Call to Repent",
        content: [
          "Remember therefore from where you have fallen; repent and do the first works, or else I will come to you quickly and remove your lampstand from its place—unless you repent. (Revelation 2:5)",
          "Three steps to restoration:",
          "1. REMEMBER—Recall the joy of your first encounter with Christ",
          "2. REPENT—Change your mind and direction",
          "3. RETURN—Do the first works, motivated by love again"
        ],
        scripture: "Revelation 2:5"
      },
      {
        title: "The Promise to Overcomers",
        content: [
          "To him who overcomes I will give to eat from the tree of life, which is in the midst of the Paradise of God. (Revelation 2:7)",
          "The tree of life, lost in Eden, is restored to those who overcome. In the New Earth, God's people will again have access to the source of eternal life."
        ],
        table: {
          headers: ["Problem", "Prescription", "Promise"],
          rows: [["Lost first love", "Remember, Repent, Return", "Tree of Life"]]
        }
      }
    ],
    keyVerses: ["Revelation 2:4-5", "Revelation 2:7", "Jeremiah 2:2"],
    reflectionQuestions: [
      "What are the dangers of doing the right things for the wrong reasons?",
      "How can we tell if we have lost our first love?",
      "What practical steps can help renew our love for Christ?",
      "Why is love more important than activity?"
    ],
    prayerPrompt: "Lord Jesus, forgive me for times when my service for You has become mechanical. Restore to me the joy of my first love. Help me to serve You from a heart of devotion, not just duty. Amen.",
    keyWords: [
      { word: "First Love", definition: "The passionate devotion and joy of initial conversion—loving Christ for who He is, not just what He does" },
      { word: "Nicolaitans", definition: "A group that taught compromise with paganism—from Greek 'nikao' (to conquer) and 'laos' (people)" },
      { word: "Lampstand", definition: "The church's calling to shine light—if love is lost, the light goes out" }
    ]
  },
  3: {
    id: 3,
    title: "Smyrna: The Persecuted Church",
    church: "Smyrna",
    era: "Persecution Era",
    dates: "100-313 AD",
    introduction: "Smyrna was a beautiful city, known for its loyalty to Rome. It was also the site of fierce persecution against Christians. Jesus gives this church no rebuke—only encouragement. They faced poverty, slander, and imminent martyrdom, but Jesus calls them rich. This is the church that learned to sing in the fire.",
    background: {
      city: "Smyrna",
      history: "A prosperous port city 35 miles north of Ephesus. Known for its loyalty to Rome, Smyrna built a temple to Emperor Tiberius in 23 AD. Polycarp, a disciple of John, was martyred here in 155 AD.",
      geography: "Built on Mount Pagos, the acropolis looked like a crown—a symbol of the city and the promise of the crown of life.",
      spiritualContext: "Christians faced brutal persecution under emperors like Nero, Domitian, and Trajan. Refusal to worship Caesar meant confiscation of property, imprisonment, and death."
    },
    sections: [
      {
        title: "Christ's Self-Designation",
        content: [
          "“These things says the First and the Last, who was dead, and came to life.” (Revelation 2:8)",
          "Jesus identifies with the suffering church—He is the First and Last, eternal and sovereign, but He also experienced death and conquered it. He can walk with them through their suffering because He has been there."
        ],
        reflection: ["How does knowing Jesus suffered change your view of your own suffering?"]
      },
      {
        title: "What Jesus Commended",
        content: [
          "I know your works, tribulation, and poverty (but you are rich); and I know the blasphemy of those who say they are Jews and are not, but are a synagogue of Satan. (Revelation 2:9)",
          "Three things Jesus knows:",
          "✓ Their works—faith in action",
          "✓ Their tribulation—pressure and affliction",
          "✓ Their poverty—material destitution (but spiritual wealth!)"
        ],
        scripture: "Revelation 2:9"
      },
      {
        title: "The Nature of Their Suffering",
        content: [
          "They were poor—yet rich. They had nothing by earthly standards, but everything in Christ.",
          "They faced blasphemy—from those who claimed to be God's people but served Satan.",
          "They faced prison and death—the devil would cast some into prison as a test."
        ],
        table: {
          headers: ["Earthly Reality", "Spiritual Reality"],
          rows: [
            ["Poor", "Rich in faith and grace"],
            ["Persecuted", "Crowned with life"],
            ["Slandered", "Vindicated by God"],
            ["Imprisoned", "Set free eternally"]
          ]
        }
      },
      {
        title: "The Exhortation",
        content: [
          "Do not fear any of those things which you are about to suffer. Indeed, the devil is about to throw some of you into prison, that you may be tested, and you will have tribulation ten days. Be faithful until death, and I will give you the crown of life. (Revelation 2:10)",
          "Jesus doesn't remove the suffering—He gives strength to endure it.",
          "'Ten days' symbolizes a complete but limited period—the persecution will end.",
          "The crown of life—not a royal diadem (diadema) but a victor's wreath (stephanos) given to Olympic champions."
        ],
        reflection: [
          "What does it mean to 'be faithful unto death'?",
          "How can we prepare now for times of testing?",
          "Why would Jesus allow suffering instead of removing it?"
        ]
      },
      {
        title: "The Promise",
        content: [
          "He who overcomes shall not be hurt by the second death. (Revelation 2:11)",
          "The second death is eternal separation from God in the lake of fire. Those who remain faithful, even to death, will be spared this—they have passed from death to life."
        ]
      }
    ],
    keyVerses: ["Revelation 2:10", "Revelation 2:11", "Matthew 10:28", "James 1:12"],
    reflectionQuestions: [
      "How can someone be poor and rich at the same time?",
      "What gives a person courage to face persecution?",
      "What is the 'crown of life'? How does it differ from other crowns?",
      "What is the 'second death' and who will be hurt by it?"
    ],
    prayerPrompt: "Lord Jesus, give me courage to face trials with faith. Help me to see that earthly poverty is nothing compared to the riches I have in You. If persecution comes, let me be faithful unto death, knowing that the crown of life awaits. Amen.",
    keyWords: [
      { word: "Tribulation", definition: "Pressure, affliction—the crushing weight of persecution" },
      { word: "Poverty (ptocheia)", definition: "Extreme destitution—having absolutely nothing, contrasted with spiritual riches" },
      { word: "Synagogue of Satan", definition: "Those who claimed to be God's people but rejected Christ—spiritual counterfeit" },
      { word: "Crown of Life", definition: "The victor's wreath—eternal life given to those who endure" },
      { word: "Second Death", definition: "Eternal separation from God—the lake of fire" }
    ]
  },
  4: {
    id: 4,
    title: "Pergamos: The Tolerant Church",
    church: "Pergamos",
    era: "Corruption Era",
    dates: "313-538 AD",
    introduction: "Pergamos was the capital of Asia Minor, a center of pagan worship where Satan's throne was located. The church here had remained faithful even when one of its members was martyred. But they tolerated false teaching—the doctrine of Balaam and the Nicolaitans. This church represents the era when Christianity became the state religion of Rome, bringing compromise and corruption.",
    background: {
      city: "Pergamos",
      history: "The capital of Asia, famous for its library of 200,000 volumes. The altar of Zeus, shaped like a throne, dominated the acropolis. Emperor worship was fiercely enforced.",
      geography: "Built on a 1,000-foot hill north of Smyrna, dominating the Caicus River valley.",
      spiritualContext: "When Constantine made Christianity legal in 313 AD, the church began to compromise with paganism. Sun worship, emperor worship, and pagan festivals were absorbed into Christianity."
    },
    sections: [
      {
        title: "Christ's Self-Designation",
        content: [
          "“These things says He who has the sharp two-edged sword.” (Revelation 2:12)",
          "The sword represents the Word of God—it cuts both ways, judging both the faithful and the unfaithful. Rome had the sword of persecution, but Jesus has the ultimate authority."
        ],
        scripture: "Revelation 2:12"
      },
      {
        title: "What Jesus Commended",
        content: [
          "I know your works, and where you dwell, where Satan's throne is. And you hold fast to My name, and did not deny My faith even in the days in which Antipas was My faithful martyr, who was killed among you, where Satan dwells. (Revelation 2:13)",
          "Four things Jesus commends:",
          "✓ Their works—faithfulness in action",
          "✓ Their dwelling in Satan's territory—yet not compromising",
          "✓ Holding fast to His name—loyalty to Christ",
          "✓ Not denying the faith—even under threat of death"
        ]
      },
      {
        title: "Where Satan's Throne Is",
        content: [
          "Pergamos was the center of four forms of paganism:",
          "1. Emperor worship—temples to Augustus and other emperors",
          "2. Zeus worship—the great altar on the acropolis shaped like a throne",
          "3. Asclepius worship—the god of healing, symbolized by a serpent",
          "4. Athena worship—the goddess of wisdom",
          "The phrase 'where Satan dwells' may refer to all these combined—the very seat of paganism."
        ]
      },
      {
        title: "What Jesus Condemned",
        content: [
          "But I have a few things against you, because you have there those who hold the doctrine of Balaam, who taught Balak to put a stumbling block before the children of Israel, to eat things sacrificed to idols, and to commit sexual immorality. (Revelation 2:14)",
          "Two false teachings tolerated:",
          "1. The doctrine of Balaam—compromise with the world to avoid persecution",
          "2. The doctrine of the Nicolaitans—using grace as license to sin",
          "Balaam couldn't curse Israel, so he taught them to compromise by joining Moab in idolatry and immorality."
        ],
        scripture: "Revelation 2:14-15"
      },
      {
        title: "The Call to Repent",
        content: [
          "Repent, or else I will come to you quickly and will fight against them with the sword of My mouth. (Revelation 2:16)",
          "Jesus demands action—tolerance of false teaching is not love; it's compromise. The church must either deal with the error or face judgment."
        ]
      },
      {
        title: "The Promise",
        content: [
          "To him who overcomes I will give some of the hidden manna to eat. And I will give him a white stone, and on the stone a new name written which no one knows except him who receives it. (Revelation 2:17)",
          "Two promises:",
          "1. Hidden manna—spiritual nourishment, the true bread from heaven",
          "2. White stone—in ancient courts, a white stone signified acquittal; in games, victory; in society, a ticket to feasts. Here, it signifies acceptance and a new identity in Christ."
        ]
      }
    ],
    keyVerses: ["Revelation 2:13", "Revelation 2:14-16", "Numbers 22-25"],
    reflectionQuestions: [
      "What does it mean to dwell 'where Satan's throne is'?",
      "What was the doctrine of Balaam? How does it apply today?",
      "How can we guard against compromise with the world?",
      "What is the significance of the white stone?"
    ],
    prayerPrompt: "Lord Jesus, give me courage to stand firm even when surrounded by the world's influence. Help me to hold fast to Your name and not deny the faith. Guard me from the spirit of compromise. Amen.",
    keyWords: [
      { word: "Balaam", definition: "A prophet who sought to curse Israel, then taught them to compromise through idolatry and immorality" },
      { word: "Nicolaitans", definition: "Those who taught that grace gives license to sin" },
      { word: "Hidden Manna", definition: "The spiritual food reserved for those who overcome—Christ Himself, the bread of life" },
      { word: "White Stone", definition: "Symbol of acquittal, acceptance, and a new identity" }
    ]
  },
  5: {
    id: 5,
    title: "Thyatira: The Compromised Church",
    church: "Thyatira",
    era: "Apostasy Era",
    dates: "538-1560 AD",
    introduction: "Thyatira was a small city known for trade guilds, each with its own patron deity. Christians had to decide whether to participate in guild feasts involving idolatry and immorality. This church is commended for its works, love, service, faith, and patience—but they tolerated a false prophetess whom Jesus calls Jezebel. This represents the long period of the Dark Ages when the church compromised with paganism and apostasy.",
    background: {
      city: "Thyatira",
      history: "A commercial center famous for purple dye (Lydia of Thyatira in Acts 16). Trade guilds controlled business, and membership involved pagan feasts.",
      geography: "Located 40 miles southeast of Pergamos, on the Lycus River—a key trade route.",
      spiritualContext: "The Dark Ages saw the church compromise with paganism, adopting pagan festivals, relics, and practices. The 'Jezebel' spirit led God's people into spiritual adultery."
    },
    sections: [
      {
        title: "Christ's Self-Designation",
        content: [
          "“These things says the Son of God, who has eyes like a flame of fire, and His feet like fine brass.” (Revelation 2:18)",
          "Jesus identifies Himself as the Son of God—His deity, in contrast to the false gods of the guilds. His eyes of fire penetrate all pretense; His feet of brass judge with unyielding justice."
        ]
      },
      {
        title: "What Jesus Commended",
        content: [
          "I know your works, love, service, faith, and your patience; and as for your works, the last are more than the first. (Revelation 2:19)",
          "Five things Jesus commends:",
          "✓ Works—active ministry",
          "✓ Love—selfless devotion",
          "✓ Service—practical ministry",
          "✓ Faith—trust and loyalty",
          "✓ Patience—endurance in trials",
          "Even more: they were growing—the last works were greater than the first!"
        ]
      },
      {
        title: "What Jesus Condemned",
        content: [
          "Nevertheless I have a few things against you, because you allow that woman Jezebel, who calls herself a prophetess, to teach and seduce My servants to commit sexual immorality and eat things sacrificed to idols. (Revelation 2:20)",
          "Jezebel was the wicked queen who led Israel into Baal worship. Here she represents a spirit of compromise that leads God's people into spiritual adultery.",
          "She called herself a prophetess—claiming divine authority for her teachings.",
          "She seduced God's servants—leading them away from pure devotion to Christ."
        ],
        scripture: "Revelation 2:20"
      },
      {
        title: "The Call to Repent",
        content: [
          "I gave her time to repent of her sexual immorality, and she did not repent. (Revelation 2:21)",
          "God is patient, giving time to repent—but that time will not last forever.",
          "Those who follow Jezebel will suffer with her unless they repent.",
          "God judges each according to their works—individually, not collectively."
        ]
      },
      {
        title: "The Promise",
        content: [
          "And he who overcomes, and keeps My works until the end, to him I will give power over the nations—'He shall rule them with a rod of iron; they shall be dashed to pieces like the potter's vessels'—as I also have received from My Father; and I will give him the morning star. (Revelation 2:26-28)",
          "Three promises:",
          "1. Power over the nations—sharing Christ's authority",
          "2. Rule with a rod of iron—participating in the final judgment",
          "3. The Morning Star—Christ Himself, the bright and morning star (Revelation 22:16)"
        ]
      }
    ],
    keyVerses: ["Revelation 2:19", "Revelation 2:20", "Revelation 2:26-28", "1 Kings 16-21"],
    reflectionQuestions: [
      "What is the danger of tolerating false teaching?",
      "How can a church have good works but still be in error?",
      "What does the 'Jezebel' spirit look like today?",
      "What does it mean to be given 'the morning star'?"
    ],
    prayerPrompt: "Lord Jesus, help me to love truth and reject error. Give me discernment to recognize the spirit of compromise. Let me not tolerate what You hate. Keep my works growing, and let me hold fast until the end. Amen.",
    keyWords: [
      { word: "Jezebel", definition: "The archetype of false teaching—leading God's people into spiritual adultery" },
      { word: "Morning Star", definition: "Christ Himself—the one who shines in the darkness and heralds the coming day" },
      { word: "Power over nations", definition: "Sharing Christ's authority in the coming kingdom" },
      { word: "Deep things of Satan", definition: "False mysteries taught by those who claimed to have special knowledge" }
    ]
  },
  6: {
    id: 6,
    title: "Sardis: The Dead Church",
    church: "Sardis",
    era: "Reformation Era",
    dates: "1560-1750 AD",
    introduction: "Sardis was an ancient capital with a glorious past but a present state of decay. The church had a reputation for being alive, but Jesus saw it as dead. This represents the period of the Reformation—when the church was revived by the rediscovery of Bible truth, but soon settled into formalism and lost its spiritual vitality.",
    background: {
      city: "Sardis",
      history: "Once the capital of the Lydian Empire, famous for its wealth. The city was captured twice because guards failed to watch—a symbol of spiritual unpreparedness.",
      geography: "Built on a plateau 1,500 feet high, with steep cliffs making it seem impregnable—but invaders found unguarded paths.",
      spiritualContext: "The Reformation brought renewed focus on Scripture, but by the 17th century, Protestant churches had become formal and lifeless—orthodox in doctrine but dead in experience."
    },
    sections: [
      {
        title: "Christ's Self-Designation",
        content: [
          "“These things says He who has the seven Spirits of God and the seven stars.” (Revelation 3:1)",
          "Jesus holds the seven Spirits—the fullness of the Holy Spirit, which Sardis lacked. He holds the stars—the leaders who failed to watch."
        ]
      },
      {
        title: "The Diagnosis",
        content: [
          "I know your works, that you have a name that you are alive, but you are dead. (Revelation 3:1)",
          "They had a reputation—a name for being alive.",
          "But Jesus' assessment was different—they were dead.",
          "It is possible to have the form of godliness without the power (2 Timothy 3:5)."
        ],
        reflection: [
          "How can a church have a name that it is alive but be dead?",
          "What is the difference between reputation and reality before God?"
        ]
      },
      {
        title: "The Prescription",
        content: [
          "Be watchful, and strengthen the things which remain, that are ready to die, for I have not found your works perfect before God. (Revelation 3:2)",
          "Four commands:",
          "1. Be watchful—stay alert, like the guards of Sardis who failed",
          "2. Strengthen what remains—there is still some life left",
          "3. Remember—recall what you received and heard",
          "4. Repent—turn back to God"
        ],
        scripture: "Revelation 3:2-3"
      },
      {
        title: "The Warning",
        content: [
          "If you will not watch, I will come upon you as a thief, and you will not know what hour I will come upon you. (Revelation 3:3)",
          "Like the unprepared city of Sardis, those who are not watchful will be caught by surprise.",
          "Jesus' coming will be sudden for those who are asleep."
        ]
      },
      {
        title: "The Promise",
        content: [
          "He who overcomes shall be clothed in white garments, and I will not blot out his name from the Book of Life; but I will confess his name before My Father and before His angels. (Revelation 3:5)",
          "Three promises:",
          "1. White garments—righteousness instead of dead works",
          "2. Name not blotted out—eternal security in the Book of Life",
          "3. Confessed before the Father—public vindication in the judgment"
        ]
      }
    ],
    keyVerses: ["Revelation 3:1", "Revelation 3:3", "Revelation 3:5"],
    reflectionQuestions: [
      "What does it mean to have a name that you are alive but be dead?",
      "How can we guard against spiritual deadness?",
      "What does 'watchfulness' look like in daily life?",
      "What is the Book of Life? How can a name be blotted out?"
    ],
    prayerPrompt: "Lord Jesus, revive my heart. Let me not be content with a reputation of life when my spirit is dead. Awaken me to watchfulness, strengthen what remains, and clothe me in white garments. Amen.",
    keyWords: [
      { word: "Dead", definition: "Spiritually lifeless—having the form of godliness without the power" },
      { word: "White Garments", definition: "The righteousness of Christ covering the saints" },
      { word: "Book of Life", definition: "The record of those who belong to God—the Lamb's book" },
      { word: "Thief in the night", definition: "Sudden, unexpected judgment for the unprepared" }
    ]
  },
  7: {
    id: 7,
    title: "Philadelphia: The Missionary Church",
    church: "Philadelphia",
    era: "Revival Era",
    dates: "1750-1844 AD",
    introduction: "Philadelphia, meaning 'brotherly love,' was a city founded to spread Greek culture. The church here had little strength but great faithfulness. Jesus gives them no rebuke—only encouragement and an open door. This represents the great missionary movement of the 18th and 19th centuries, when the gospel went to the ends of the earth and Bible prophecy was rediscovered.",
    background: {
      city: "Philadelphia",
      history: "Founded by King Attalus II of Pergamos, whose loyalty to his brother earned him the name 'Philadelphus'—lover of brother. The city was a missionary outpost spreading Greek culture.",
      geography: "Located 28 miles southeast of Sardis, on the Persian Royal Road—a gateway to the east.",
      spiritualContext: "The Great Awakening, the missionary movement, and the rediscovery of prophecy marked this era. William Carey went to India, David Livingstone to Africa, and the Bible was translated into hundreds of languages."
    },
    sections: [
      {
        title: "Christ's Self-Designation",
        content: [
          "“These things says He who is holy, He who is true, He who has the key of David, He who opens and no one shuts, and shuts and no one opens.” (Revelation 3:7)",
          "Four titles:",
          "1. Holy—set apart, pure, divine",
          "2. True—genuine, authentic, reliable",
          "3. Key of David—authority over God's kingdom",
          "4. Opens and shuts—sovereign control over doors of opportunity"
        ],
        scripture: "Revelation 3:7"
      },
      {
        title: "What Jesus Commended",
        content: [
          "I know your works. See, I have set before you an open door, and no one can shut it; for you have a little strength, have kept My word, and have not denied My name. (Revelation 3:8)",
          "Three commendations:",
          "1. Little strength—yet faithful with what they had",
          "2. Kept His word—held fast to Scripture",
          "3. Did not deny His name—loyal to Christ despite opposition",
          "Result: an open door—opportunities for mission that no one could shut."
        ]
      },
      {
        title: "The Open Door",
        content: [
          "The door represents:",
          "• Opportunity for mission—the gospel going to all nations",
          "• Access to God—through Christ, the door (John 10:9)",
          "• Entrance to the kingdom—open to all who believe"
        ],
        table: {
          headers: ["Little Strength", "Kept Word", "Didn't Deny Name", "Result"],
          rows: [["Limited resources", "Biblical faithfulness", "Loyal to Christ", "Open door for mission"]]
        }
      },
      {
        title: "The Promise",
        content: [
          "He who overcomes, I will make him a pillar in the temple of My God, and he shall go out no more. I will write on him the name of My God and the name of the city of My God, the New Jerusalem, which comes down out of heaven from My God, and I will write on him My new name. (Revelation 3:12)",
          "Three promises:",
          "1. Pillar in the temple—permanent, secure, honored place in God's presence",
          "2. Name of God—identification as belonging to the Father",
          "3. Name of the New Jerusalem—citizenship in the heavenly city",
          "4. Christ's new name—intimate relationship with the Savior"
        ]
      }
    ],
    keyVerses: ["Revelation 3:8", "Revelation 3:10", "Revelation 3:12"],
    reflectionQuestions: [
      "What does 'little strength' mean? How can God use it?",
      "What is the 'open door' that Jesus sets before His church?",
      "What does it mean to be a 'pillar' in God's temple?",
      "What is the significance of receiving a new name?"
    ],
    prayerPrompt: "Lord Jesus, give me the faithfulness of Philadelphia. Though I have little strength, help me to keep Your word and not deny Your name. Open doors of opportunity for Your gospel that no one can shut. Amen.",
    keyWords: [
      { word: "Open Door", definition: "Divinely appointed opportunity for mission and witness" },
      { word: "Little Strength", definition: "Humble resources fully yielded to God—enough for His purposes" },
      { word: "Key of David", definition: "Christ's authority over the kingdom, fulfilling God's promise to David" },
      { word: "Pillar", definition: "Permanent, honored position in God's eternal temple" }
    ]
  },
  8: {
    id: 8,
    title: "Laodicea: The Lukewarm Church",
    church: "Laodicea",
    era: "End Times",
    dates: "1844 - Present",
    introduction: "Laodicea was a wealthy city famous for its banking, black wool, and eye salve. The church reflected the city—rich, self-sufficient, and complacent. But Jesus sees them as wretched, miserable, poor, blind, and naked. This is the church of the last days—comfortable in its wealth, confident in its condition, but spiritually bankrupt. Yet even here, Jesus stands at the door and knocks, offering to restore.",
    background: {
      city: "Laodicea",
      history: "A wealthy banking center, famous for black wool, and an eye salve that was exported worldwide. The city was destroyed by an earthquake in AD 60 but rebuilt without imperial help—a source of pride.",
      geography: "Located 40 miles southeast of Philadelphia, in the Lycus Valley. Its water was lukewarm—piped from hot springs at Hierapolis, cooling on the journey.",
      spiritualContext: "The church of the last days is characterized by self-sufficiency, complacency, and lukewarm spirituality. It represents Christianity from the mid-19th century to the present."
    },
    sections: [
      {
        title: "Christ's Self-Designation",
        content: [
          "“These things says the Amen, the Faithful and True Witness, the Beginning of the creation of God.” (Revelation 3:14)",
          "Three titles:",
          "1. The Amen—the final word, the one who confirms God's promises",
          "2. The Faithful and True Witness—the one whose testimony is reliable",
          "3. The Beginning of creation—the source and originator of all things"
        ]
      },
      {
        title: "The Diagnosis",
        content: [
          "I know your works, that you are neither cold nor hot. I could wish you were cold or hot. So then, because you are lukewarm, and neither cold nor hot, I will vomit you out of My mouth. (Revelation 3:15-16)",
          "Lukewarm water was nauseating—the hot springs of Hierapolis were therapeutic, the cold waters of Colossae refreshing, but Laodicea's water was tepid and sickening.",
          "Spiritually, lukewarmness is being neither fully committed nor fully rebellious—comfortable, complacent, and indifferent."
        ],
        scripture: "Revelation 3:15-16"
      },
      {
        title: "The Self-Deception",
        content: [
          "Because you say, 'I am rich, have become wealthy, and have need of nothing'—and do not know that you are wretched, miserable, poor, blind, and naked. (Revelation 3:17)",
          "The Laodiceans trusted in material wealth, but were spiritually bankrupt.",
          "Five things they didn't know about themselves:",
          "• Wretched—condemned and pitiable",
          "• Miserable—in a state of despair",
          "• Poor—spiritually destitute",
          "• Blind—unable to see their true condition",
          "• Naked—lacking the covering of Christ's righteousness"
        ],
        table: {
          headers: ["What They Said", "What Jesus Said", "What They Needed"],
          rows: [
            ["I am rich", "Wretched, poor", "Gold refined by fire"],
            ["I have need of nothing", "Miserable", "White garments"],
            ["I see clearly", "Blind", "Eye salve"]
          ]
        }
      },
      {
        title: "The Counsel",
        content: [
          "I counsel you to buy from Me gold refined in the fire, that you may be rich; and white garments, that you may be clothed, that the shame of your nakedness may not be revealed; and anoint your eyes with eye salve, that you may see. (Revelation 3:18)",
          "Three things to buy:",
          "1. Gold refined by fire—genuine faith, tested and proven",
          "2. White garments—the righteousness of Christ",
          "3. Eye salve—spiritual discernment from the Holy Spirit",
          "We 'buy' these by giving up our own self-sufficiency and receiving them from Christ."
        ]
      },
      {
        title: "The Invitation",
        content: [
          "Behold, I stand at the door and knock. If anyone hears My voice and opens the door, I will come in to him and dine with him, and he with Me. (Revelation 3:20)",
          "This is the most tender invitation in all the letters—Jesus stands outside His own church, asking to be let in.",
          "He doesn't force His way—He knocks and waits.",
          "The response is individual—'If anyone hears.'",
          "The result is intimate fellowship—dining together."
        ],
        reflection: [
          "Why would Jesus be outside His own church?",
          "What does it mean to open the door to Him?",
          "What is the significance of dining together?"
        ]
      },
      {
        title: "The Promise",
        content: [
          "To him who overcomes I will grant to sit with Me on My throne, as I also overcame and sat down with My Father on His throne. (Revelation 3:21)",
          "The highest promise of all—to share Christ's throne.",
          "Not just access to the kingdom, but partnership in His reign.",
          "This is the ultimate reward for those who overcome the spirit of Laodicean complacency."
        ]
      }
    ],
    keyVerses: ["Revelation 3:15-16", "Revelation 3:17", "Revelation 3:18", "Revelation 3:20"],
    reflectionQuestions: [
      "What does 'lukewarm' mean spiritually?",
      "How can we be deceived about our own spiritual condition?",
      "What is the 'gold refined in fire' we need to buy?",
      "Why is Jesus standing outside His own church?",
      "What does it mean to open the door to Him?"
    ],
    prayerPrompt: "Lord Jesus, I don't want to be lukewarm. Forgive me for the times I've been complacent, self-satisfied, and blind to my true need. I open the door of my heart to You. Come in, take Your place on the throne of my life. Clothe me in Your righteousness, refine my faith, and give me eyes to see. Amen.",
    keyWords: [
      { word: "Lukewarm", definition: "Neither hot nor cold—indifferent, complacent, spiritually apathetic" },
      { word: "Gold refined by fire", definition: "Genuine faith tested and proven through trials" },
      { word: "White garments", definition: "Christ's righteousness covering our nakedness" },
      { word: "Eye salve", definition: "The Holy Spirit's work giving spiritual discernment" },
      { word: "Door", definition: "The heart's entrance—Christ knocks, we must open" }
    ]
  }
};