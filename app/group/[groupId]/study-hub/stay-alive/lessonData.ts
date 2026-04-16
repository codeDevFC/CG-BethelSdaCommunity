export interface LessonSection {
  title: string;
  content: string[];
  scripture?: string;
}

export interface LessonData {
  id: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  scripture: string;
  introduction: string;
  memoryVerse: string;
  sections: LessonSection[];
  keyVerses: string[];
  reflectionQuestions: string[];
  prayerPrompt: string;
  keyWords: { word: string; definition: string }[];
  application: string[];
  audioFile?: string;
}

export const stayAliveData: Record<string, LessonData> = {
  "SA01": {
    id: "SA01",
    lessonNumber: 1,
    title: "He's Coming Back",
    subtitle: "The Blessed Hope of His Return",
    scripture: "John 14:1-3, Matthew 24:36, Revelation 1:7",
    introduction: "Through the centuries families have watched loved ones leave home to fight wars, explore new places or make money. The hope of all who stay home has always been 'He'll be back. She'll return.' When Jesus left His friends on earth, He gave them a promise: 'I will come again.' Since that time, all who love Him have been looking for Him.",
    memoryVerse: "John 14:1-3 - 'Let not your heart be troubled; you believe in God, believe also in Me. In My Father's house are many mansions; if it were not so, I would have told you. I go to prepare a place for you. And if I go and prepare a place for you, I will come again and receive you to Myself; that where I am, there you may be also.'",
    sections: [
      {
        title: "Jesus Promised to Return",
        content: [
          "Jesus said: 'Let not your heart be troubled; you believe in God, believe also in Me. In My Father's house are many mansions; if it were not so, I would have told you. I go to prepare a place for you. And if I go and prepare a place for you, I will come again and receive you to Myself; that where I am, there you may be also.' (John 14:1-3)",
          "The Bible speaks of this event 1,518 times! That's about one out of every 25 verses. God wants us to be absolutely certain that Jesus is coming back.",
          "The disciples watched Jesus ascend to heaven, and angels told them: 'This same Jesus, who was taken up from you into heaven, will so come in like manner as you saw Him go into heaven.' (Acts 1:11)"
        ],
        scripture: "John 14:1-3, Acts 1:11"
      },
      {
        title: "Signs in the Physical World",
        content: [
          "Jesus said: 'Nation will rise against nation, and kingdom against kingdom. And there will be famines, pestilences, and earthquakes in various places.' (Matthew 24:7)",
          "Today, 1.2 billion people cannot afford basic necessities—close to one-fourth of the world's population. Major earthquakes have increased dramatically in recent decades.",
          "Jesus also warned: 'There will be signs in the sun, in the moon, and in the stars; and on the earth distress of nations, with perplexity, the sea and the waves roaring.' (Luke 21:25)"
        ],
        scripture: "Matthew 24:7, Luke 21:25"
      },
      {
        title: "Signs in the Political World",
        content: [
          "Jesus warned: 'You will hear of wars and rumors of wars. See that you are not troubled; for all these things must come to pass, but the end is not yet.' (Matthew 24:6)",
          "World governments are in constant struggle—another evidence we are approaching the end of time. The 20th century was the bloodiest in human history.",
          "The prophet Daniel saw: 'And in the days of these kings the God of heaven will set up a kingdom which shall never be destroyed.' (Daniel 2:44)"
        ],
        scripture: "Matthew 24:6, Daniel 2:44"
      },
      {
        title: "Signs in the Intellectual World",
        content: [
          "Daniel prophesied: 'But you, Daniel, shut up the words, and seal the book until the time of the end; many shall run to and fro, and knowledge shall increase.' (Daniel 12:4)",
          "From horseback to outer space travel in one hundred years—this prophecy is fulfilled! We have seen more technological advancement in the last century than in all previous history combined.",
          "The increase in travel and knowledge are clear signs that we are living in 'the time of the end.'"
        ],
        scripture: "Daniel 12:4"
      },
      {
        title: "The Gospel to All the World",
        content: [
          "Jesus said: 'This gospel of the kingdom will be preached in all the world as a witness to all the nations, and then the end will come.' (Matthew 24:14)",
          "Mission programs have sprung up all over the world. Today, thousands carry the gospel to every part of the globe.",
          "The combination of fulfilled prophecy and worldwide mission work tells us that Jesus is coming soon!"
        ],
        scripture: "Matthew 24:14"
      }
    ],
    keyVerses: ["John 14:1-3", "Matthew 24:36", "Revelation 1:7"],
    reflectionQuestions: [
      "What does Jesus promise in John 14:1-3?",
      "What are some signs that Jesus is coming soon?",
      "Why did Jesus say not to be troubled?",
      "How do the signs of the times affect your daily life?",
      "Are you looking forward to Christ's coming? Why or why not?"
    ],
    prayerPrompt: "Lord Jesus, I look forward to Your soon return. Help me to be ready and to share this hope with others. Open my eyes to the signs around me and give me courage to live for You each day. Amen.",
    keyWords: [
      { word: "Second Coming", definition: "The visible, literal return of Jesus Christ to earth" },
      { word: "Signs of the Times", definition: "Prophetic indicators that Christ's return is near" },
      { word: "Blessed Hope", definition: "The joyful expectation of Jesus' return (Titus 2:13)" }
    ],
    application: [
      "Share the hope of Jesus' return with someone this week",
      "Make a list of fulfilled prophecies that give you confidence",
      "Pray for those who don't yet know this hope"
    ],
    audioFile: "/audio/stay-alive/lesson1.mp3"
  },
  "SA02": {
    id: "SA02",
    lessonNumber: 2,
    title: "When He Comes",
    subtitle: "The Glorious Appearing",
    scripture: "1 Thessalonians 4:16-17, Matthew 24:27, Revelation 1:7",
    introduction: "If kings, rulers, presidents arrive with parades, television coverage, shiny limousines preceded by bands, soldiers and flags, how do you suppose the King of the universe will return? The Bible gives us a spectacular picture of the most anticipated event in history.",
    memoryVerse: "1 Thessalonians 4:16-17 - 'For the Lord Himself will descend from heaven with a shout, with the voice of an archangel, and with the trumpet of God. And the dead in Christ will rise first. Then we who are alive and remain shall be caught up together with them in the clouds to meet the Lord in the air. And thus we shall always be with the Lord.'",
    sections: [
      {
        title: "How Jesus Will Come",
        content: [
          "Jesus comes with power and glory: 'Our God shall come, and shall not keep silent; a fire shall devour before Him.' (Psalm 50:3)",
          "'For as the lightning comes from the east and flashes to the west, so also will the coming of the Son of Man be.' (Matthew 24:27)",
          "He will come with all the angels: 'When the Son of Man comes in His glory, and all the holy angels with Him.' (Matthew 25:31)"
        ],
        scripture: "Psalm 50:3, Matthew 24:27, Matthew 25:31"
      },
      {
        title: "Every Eye Will See Him",
        content: [
          "Jesus came quietly to earth the first time. Not so the second time: 'Behold, He is coming with clouds, and every eye will see Him.' (Revelation 1:7)",
          "His coming will not be a 'secret rapture' known only to a few. Jesus warned: 'If anyone says to you, \"Look, here is the Christ!\" or \"There!\" do not believe it.' (Matthew 24:23)",
          "The Second Coming is public, visible, and unmistakable. No one will miss it!"
        ],
        scripture: "Revelation 1:7, Matthew 24:23"
      },
      {
        title: "What Happens to Christians",
        content: [
          "Paul writes: 'The Lord Himself will descend from heaven with a shout, with the voice of an archangel, and with the trumpet of God. And the dead in Christ will rise first. Then we who are alive and remain shall be caught up together with them in the clouds to meet the Lord in the air.' (1 Thessalonians 4:16-17)",
          "Living believers will be transformed: 'We shall all be changed—in a moment, in the twinkling of an eye, at the last trumpet.' (1 Corinthians 15:51-52)",
          "What a glorious reunion that will be!"
        ],
        scripture: "1 Thessalonians 4:16-17, 1 Corinthians 15:51-52"
      },
      {
        title: "What Happens to the Wicked",
        content: [
          "Those who do not love Christ will not want to see Him: 'The kings of the earth, the great men, the rich men, the commanders, the mighty men, every slave and every free man, hid themselves in the caves and in the rocks of the mountains.' (Revelation 6:15-16)",
          "The wicked are destroyed by the brightness of His coming: 'The Lord Jesus will be revealed from heaven with His mighty angels, in flaming fire taking vengeance on those who do not know God.' (2 Thessalonians 1:7-8)"
        ],
        scripture: "Revelation 6:15-16, 2 Thessalonians 1:7-8"
      },
      {
        title: "Why Jesus Is Coming",
        content: [
          "Jesus is coming for you: 'He will send His angels with a great sound of a trumpet, and they will gather together His elect from the four winds.' (Matthew 24:31)",
          "'I will come again and receive you to Myself; that where I am, there you may be also.' (John 14:3)",
          "He also brings a crown of righteousness for all who love Him. (2 Timothy 4:8)"
        ],
        scripture: "Matthew 24:31, John 14:3, 2 Timothy 4:8"
      }
    ],
    keyVerses: ["1 Thessalonians 4:16-17", "Matthew 24:27", "Revelation 1:7"],
    reflectionQuestions: [
      "How will Jesus return?",
      "What does 'every eye will see Him' mean?",
      "What happens to Christians at the Second Coming?",
      "What happens to those who do not love Christ?",
      "Why is Jesus coming back?"
    ],
    prayerPrompt: "Even so, come, Lord Jesus! Thank You for the promise of Your return and for the hope of being with You forever. Keep me faithful until that glorious day. Amen.",
    keyWords: [
      { word: "Resurrection", definition: "The raising of the dead to life at Christ's return" },
      { word: "Transformation", definition: "The changing of living believers' bodies at His coming" },
      { word: "Archangel", definition: "A chief angel; Michael, the leader of God's angels" }
    ],
    application: [
      "Share with a friend what will happen when Jesus returns",
      "Write a prayer expressing your longing for His coming",
      "Encourage someone who has lost a loved one with the hope of resurrection"
    ],
    audioFile: "/audio/stay-alive/lesson2.mp3"
  },
  "SA03": {
    id: "SA03",
    lessonNumber: 3,
    title: "Your First 1000 Years with Jesus",
    subtitle: "The Millennium Revealed",
    scripture: "Revelation 20:1-6, 1 Thessalonians 4:16, Revelation 21:1",
    introduction: "Imagine living a thousand years—from before the Magna Carta to space exploration! The Bible devotes a whole chapter, Revelation 20, to describing the first thousand years of eternity. What will this amazing period be like?",
    memoryVerse: "Revelation 20:6 - 'Blessed and holy is he who has part in the first resurrection. Over such the second death has no power, but they shall be priests of God and of Christ, and shall reign with Him a thousand years.'",
    sections: [
      {
        title: "The Beginning of the 1000 Years",
        content: [
          "What marks the beginning of the millennium? 'The Lord Himself will descend from heaven with a shout.' (1 Thessalonians 4:16)",
          "At Christ's coming: the righteous dead are resurrected, the living righteous are caught up to heaven, the bodies of the righteous are changed, the living wicked are killed, and Satan is bound. (Revelation 20:1-3)",
          "This begins the thousand-year period often called 'the millennium.'"
        ],
        scripture: "1 Thessalonians 4:16, Revelation 20:1-3"
      },
      {
        title: "What Does 'Satan Bound' Mean?",
        content: [
          "If the righteous are in heaven and the wicked are dead, what is there for Satan to do? He is bound by circumstances—there is nobody to tempt.",
          "The earth is desolate and he is imprisoned in solitude. As Jeremiah describes: 'I beheld the earth, and indeed it was without form, and void; and the heavens, they had no light.' (Jeremiah 4:23)",
          "Satan is 'bound' by the chain of circumstances—no one to deceive for a thousand years."
        ],
        scripture: "Jeremiah 4:23, Revelation 20:1-3"
      },
      {
        title: "Where Will You Be?",
        content: [
          "You will be reigning with Christ: 'I saw thrones, and they sat on them, and judgment was committed to them... And they lived and reigned with Christ for a thousand years.' (Revelation 20:4-6)",
          "This is your opportunity to see that God has been fair in His judgments.",
          "You will participate in the judgment of the wicked: 'Do you not know that the saints will judge the world?' (1 Corinthians 6:2)"
        ],
        scripture: "Revelation 20:4-6, 1 Corinthians 6:2"
      },
      {
        title: "The End of the 1000 Years",
        content: [
          "At the close of the millennium: the wicked are resurrected, Satan is loosed, the Holy City descends, the wicked surround the city, and the wicked are destroyed.",
          "Then God creates a new earth: 'Now I saw a new heaven and a new earth, for the first heaven and the first earth had passed away.' (Revelation 21:1)",
          "Sin and sinners are no more. Eternity with God begins!"
        ],
        scripture: "Revelation 21:1, Revelation 20:5-10"
      }
    ],
    keyVerses: ["Revelation 20:1-6", "1 Thessalonians 4:16", "Revelation 21:1"],
    reflectionQuestions: [
      "What event marks the beginning of the 1000 years?",
      "What does it mean that Satan is 'bound'?",
      "What will you be doing during the millennium?",
      "How does the millennium demonstrate God's justice?",
      "What happens at the end of the 1000 years?"
    ],
    prayerPrompt: "Lord, thank You for the hope of eternity with You. Help me to live in light of that glorious future. Give me a longing for the New Earth and for reigning with You. Amen.",
    keyWords: [
      { word: "Millennium", definition: "The thousand-year reign of Christ with His saints" },
      { word: "Abyss", definition: "The desolate earth during the millennium; the 'bottomless pit'" },
      { word: "First Resurrection", definition: "The resurrection of the righteous at Christ's coming" }
    ],
    application: [
      "Thank God for His fair and just character",
      "Share with someone about the millennium and God's justice",
      "Live today with eternity in mind"
    ],
    audioFile: "/audio/stay-alive/lesson3.mp3"
  },
  "SA04": {
    id: "SA04",
    lessonNumber: 4,
    title: "New Earth For You",
    subtitle: "Your Eternal Home",
    scripture: "Revelation 21:1-5, Isaiah 65:17-25, 2 Peter 3:13",
    introduction: "Some think heaven is boring—sitting on clouds playing harps. But is that what heaven is like? God says He will make a New Earth—a real, physical place with exciting activities and perfect relationships. Let's explore what God has prepared for those who love Him.",
    memoryVerse: "Revelation 21:4 - 'And God will wipe away every tear from their eyes; there shall be no more death, nor sorrow, nor crying. There shall be no more pain, for the former things have passed away.'",
    sections: [
      {
        title: "The New Earth",
        content: [
          "God says: 'Behold, I make all things new.' (Revelation 21:5)",
          "Before making things new, the earth is cleansed by fire: 'The heavens will pass away with a great noise, and the elements will melt with fervent heat; both the earth and the works that are in it will be burned up.' (2 Peter 3:10)",
          "Then God shapes our planet into a new and perfect place—the home of the redeemed forever."
        ],
        scripture: "Revelation 21:5, 2 Peter 3:10"
      },
      {
        title: "What Will It Be Like?",
        content: [
          "Isaiah describes: 'The wilderness and the wasteland shall be glad for them, and the desert shall rejoice and blossom as the rose.' (Isaiah 35:1-2)",
          "Even animals will have new natures: 'The wolf also shall dwell with the lamb, the leopard shall lie down with the young goat.' (Isaiah 11:6-9)",
          "The New Earth will be more beautiful than we can imagine!"
        ],
        scripture: "Isaiah 35:1-7, Isaiah 11:6-9"
      },
      {
        title: "No More Sorrow",
        content: [
          "The best news: 'God will wipe away every tear from their eyes; there shall be no more death, nor sorrow, nor crying. There shall be no more pain, for the former things have passed away.' (Revelation 21:4)",
          "Can you imagine a place without pain, sorrow, sickness, death, crime, violence, or injustice?",
          "Every tear will be wiped away—no more goodbyes, no more heartache."
        ],
        scripture: "Revelation 21:4"
      },
      {
        title: "What Will You Do?",
        content: [
          "You'll build and plant: 'They shall build houses and inhabit them; they shall plant vineyards and eat their fruit.' (Isaiah 65:21-22)",
          "You'll never be interrupted by fatigue, illness, or death.",
          "Children will play safely: 'The streets of the city shall be full of boys and girls playing.' (Zechariah 8:5)"
        ],
        scripture: "Isaiah 65:21-22, Zechariah 8:5"
      },
      {
        title: "Your New Body",
        content: [
          "You'll be like Jesus: 'We know that when He is revealed, we shall be like Him, for we shall see Him as He is.' (1 John 3:2)",
          "Jesus' resurrected body could eat and be touched—yet He could appear and disappear.",
          "You'll never get sick or old or die."
        ],
        scripture: "1 John 3:2, Revelation 21:4"
      }
    ],
    keyVerses: ["Revelation 21:1-5", "Isaiah 65:17-25", "2 Peter 3:13"],
    reflectionQuestions: [
      "What will the New Earth be like?",
      "What will you do there?",
      "What kind of body will you have?",
      "Who will be there?",
      "What are you most looking forward to in the New Earth?"
    ],
    prayerPrompt: "Lord, thank You for the promise of the New Earth. Help me to live today in light of that glorious tomorrow. Keep my heart focused on eternity and give me a longing for my true home. Amen.",
    keyWords: [
      { word: "New Earth", definition: "The re-created earth where the redeemed will live forever" },
      { word: "Tree of Life", definition: "The tree in Eden that will be restored in the New Earth" },
      { word: "Holy City", definition: "The New Jerusalem, the capital of the New Earth" }
    ],
    application: [
      "Thank God for the promise of the New Earth",
      "Live each day with eternity in view",
      "Share this hope with someone who needs encouragement"
    ],
    audioFile: "/audio/stay-alive/lesson4.mp3"
  },
  "SA05": {
    id: "SA05",
    lessonNumber: 5,
    title: "Where Are You After You Die?",
    subtitle: "The Truth About Death",
    scripture: "Ecclesiastes 9:5-6, John 11:11-14, 1 Thessalonians 4:13-14",
    introduction: "Nobody likes to think about death, but you can't hide from it. What if you die before Jesus comes? What happens then? The Bible gives clear, comforting answers about the state of the dead.",
    memoryVerse: "1 Thessalonians 4:13-14 - 'But I do not want you to be ignorant, brethren, concerning those who have fallen asleep, lest you sorrow as others who have no hope. For if we believe that Jesus died and rose again, even so God will bring with Him those who sleep in Jesus.'",
    sections: [
      {
        title: "How God Created Us",
        content: [
          "God formed man from the dust of the ground and breathed into his nostrils the breath of life, and man became a living being. (Genesis 2:7)",
          "Dust + Breath = Living Being/Soul. The same word is used for 'living being' and 'soul' in the Bible.",
          "We don't have a soul that leaves the body—we are souls (living beings)."
        ],
        scripture: "Genesis 2:7"
      },
      {
        title: "What Happens at Death",
        content: [
          "Solomon wrote: 'The living know that they will die; but the dead know nothing, and they have no more reward.' (Ecclesiastes 9:5-6)",
          "David said: 'His spirit departs, he returns to his earth; in that very day his plans perish.' (Psalm 146:4)",
          "The dead cannot think, feel, or act—they are unconscious."
        ],
        scripture: "Ecclesiastes 9:5-10, Psalm 146:4"
      },
      {
        title: "Death Is Like Sleep",
        content: [
          "Jesus said of Lazarus: 'Our friend Lazarus sleeps, but I go that I may wake him up.' (John 11:11)",
          "The disciples thought He meant natural sleep, but Jesus spoke of his death.",
          "When the righteous die, they 'sleep in Jesus' until the resurrection."
        ],
        scripture: "John 11:11-14"
      },
      {
        title: "The First Lie",
        content: [
          "Satan said to Eve: 'You will not surely die.' (Genesis 3:4)",
          "But God said: 'You shall surely die.' (Genesis 2:17)",
          "From this ancient lie comes many false ideas about death."
        ],
        scripture: "Genesis 3:4, Genesis 2:17"
      },
      {
        title: "The Hope of Resurrection",
        content: [
          "Jesus said: 'I am the resurrection and the life. He who believes in Me, though he may die, he shall live.' (John 11:25)",
          "When will this happen? 'The dead in Christ will rise first.' (1 Thessalonians 4:16)",
          "Jesus is the way out of the grave! Because He lives, we will live also."
        ],
        scripture: "John 11:25, 1 Thessalonians 4:16"
      }
    ],
    keyVerses: ["Ecclesiastes 9:5-6", "John 11:11-14", "1 Thessalonians 4:13-14"],
    reflectionQuestions: [
      "What happens to a person when they die according to the Bible?",
      "What was Satan's first lie?",
      "How does Jesus describe death?",
      "What hope do we have for those who have died?"
    ],
    prayerPrompt: "Lord, thank You for the hope of the resurrection. Comfort me with the assurance that death is not the end. Help me to trust Your Word about death and to find peace in the promise of Jesus' return. Amen.",
    keyWords: [
      { word: "Soul", definition: "A living being; not something that leaves the body at death" },
      { word: "Resurrection", definition: "The raising of the dead to life at Christ's return" },
      { word: "Sleep", definition: "The Bible's metaphor for death—unconscious rest until resurrection" }
    ],
    application: [
      "Find comfort in the Bible's teaching about death",
      "Share this hope with someone grieving",
      "Reject spiritualism and trust only God's Word"
    ],
    audioFile: "/audio/stay-alive/lesson5.mp3"
  },
  "SA06": {
    id: "SA06",
    lessonNumber: 6,
    title: "Destruction of the Wicked",
    subtitle: "God's Justice Revealed",
    scripture: "Malachi 4:1-3, 2 Peter 3:9-10, Revelation 20:9-10",
    introduction: "How can God be loving and then torture people in hell-fire forever? This question has troubled many. But God has been given bad publicity. The subject of hell-fire has been greatly misunderstood. Let's see what the Bible really teaches.",
    memoryVerse: "Malachi 4:1 - 'For behold, the day is coming, burning like an oven, and all the proud, yes, all who do wickedly will be stubble.'",
    sections: [
      {
        title: "What God Is Like",
        content: [
          "The Lord is not willing that any should perish but that all should come to repentance. (2 Peter 3:9)",
          "God desires all to be saved. (1 Timothy 2:4)",
          "Yet the wages of sin is death. (Romans 6:23)",
          "God takes no pleasure in the death of the wicked. (Ezekiel 33:11)"
        ],
        scripture: "2 Peter 3:9, 1 Timothy 2:4, Romans 6:23, Ezekiel 33:11"
      },
      {
        title: "When Does Destruction Happen?",
        content: [
          "The destruction of the wicked takes place at the end of the thousand years.",
          "Malachi describes: 'The day is coming, burning like an oven, and all the proud, yes, all who do wickedly will be stubble.' (Malachi 4:1)",
          "The wicked are destroyed—not tormented forever."
        ],
        scripture: "Revelation 20:10-15, Malachi 4:1"
      },
      {
        title: "What Does 'Forever' Mean?",
        content: [
          "When the Bible uses 'forever' for God, it means unending. When used for people, it means for as long as they live.",
          "Hannah gave her son to the Lord 'forever'—as long as he lived. (1 Samuel 1:22,28)",
          "The wicked will be burned up—completely destroyed. (Psalm 37:20)"
        ],
        scripture: "1 Samuel 1:22-28, Psalm 37:20"
      },
      {
        title: "The Only Way Out",
        content: [
          "Jesus is the only way to eternal life: 'For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.' (John 3:16)",
          "The choice is yours: perish (be destroyed) or have everlasting life.",
          "Choose life today! (Deuteronomy 30:19)"
        ],
        scripture: "John 3:16, Deuteronomy 30:19"
      }
    ],
    keyVerses: ["Malachi 4:1-3", "2 Peter 3:9-10", "Revelation 20:9-10"],
    reflectionQuestions: [
      "What is God's desire for all people?",
      "When does the destruction of the wicked take place?",
      "What does 'forever' mean when applied to people?",
      "How can you be sure to have eternal life?"
    ],
    prayerPrompt: "Lord, thank You for Your love and patience. Thank You that You don't want anyone to perish. Help me to choose life today and to share this good news with others. Amen.",
    keyWords: [
      { word: "Second Death", definition: "The final, permanent death of the wicked" },
      { word: "Lake of Fire", definition: "The fire that destroys the wicked at the end of the millennium" },
      { word: "Perish", definition: "To be destroyed; the opposite of everlasting life" }
    ],
    application: [
      "Thank God for His justice and mercy",
      "Choose life today by accepting Jesus as your Savior",
      "Share this truth about God's character with someone"
    ],
    audioFile: "/audio/stay-alive/lesson6.mp3"
  }
};

// Also export as numeric IDs for compatibility with the series page
export const stayAliveDataById: Record<number, any> = {
  1: stayAliveData["SA01"],
  2: stayAliveData["SA02"],
  3: stayAliveData["SA03"],
  4: stayAliveData["SA04"],
  5: stayAliveData["SA05"],
  6: stayAliveData["SA06"]
};

export default stayAliveData;
