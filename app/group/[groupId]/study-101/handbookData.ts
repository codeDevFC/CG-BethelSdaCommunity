// Complete Handbook Data for all 51 Studies

export interface StudySection {
  t: string;
  c: string;
}

export interface StudyData {
  title: string;
  intro: string;
  sections: StudySection[];
  reflections: string[];
  keyVerses: string[];
}

export const handbookData: Record<string, StudyData> = {
  // Study 1: In Search of Freedom
  "1": {
    title: "In Search of Freedom: Synthesis of the Bible",
    intro: "The Christian journey is a fascinating but demanding journey. Is it worth taking? What are we really looking for, and what does the Bible offer us? A starting point is the famous parable of the prodigal son, which we prefer to call 'Parable of Freedom.'",
    sections: [
      { t: "The First Message", c: "We are all children of God and this world is the home He had prepared for us. The world created by God was good, there was harmony, peace, and abundant life for every creature. (Genesis 1:1, 31; 1:27-30)" },
      { t: "The Tempter and the Fall", c: "A tempter leads man to doubt the Father's love and prompts him to break away, embarking on a path of autonomy. The Bible calls this experience slavery to sin. (Genesis 3:4-5; John 8:34)" },
      { t: "The Journey of Return", c: "In man's heart, the need for God always resounds. The Bible calls this experience repentance (capacity to see things in a different way) and conversion (change of path). (Acts 3:19; Luke 15:20)" },
      { t: "The Final Restoration", c: "In the end, God brings us home, restoring the condition of honor we had lost. This is the description of the new earth, where there will be no more tears or sorrow. (Revelation 21:1-4; Isaiah 65:17)" }
    ],
    reflections: ["How would you define the Bible based on this study?", "What is true freedom according to Jesus in John 8:31-36?", "Why does the son ask for his inheritance? What does this symbolize?"],
    keyVerses: ["John 8:31-32", "Galatians 5:13", "Romans 6:22"]
  },
  // Study 2: God Exists
  "2": {
    title: "God Exists",
    intro: "Who are we? Are we children of chance? Do we have a Father who created us and has a plan for us? Does God exist? This is a fundamental question about the meaning of life.",
    sections: [
      { t: "Testimony of Nature", c: "When we observe the wonderful spectacle of nature, its beauty, complexity, and power, it is entirely natural to understand that there must be a wise and powerful Creator. (Psalm 19:1-3; Romans 1:20)" },
      { t: "Testimony of the Heart", c: "Man feels called to something better and more lasting than current life. God has written in our hearts that we come from an infinite Being. (Ecclesiastes 3:11; Psalm 42:1-2)" },
      { t: "Testimony of Conscience", c: "Human beings have a conscience that makes them aware of justice and injustice, good and evil. This voice calls us to live according to the will of a just God. (Romans 2:14-15; 1 Timothy 1:5)" }
    ],
    reflections: ["Is there anything in nature that arouses your admiration?", "Have you ever been tempted not to believe? What helped you?", "What does Hebrews 11:6 teach about faith and pleasing God?"],
    keyVerses: ["Psalm 19:1", "Romans 1:20", "Hebrews 11:6"]
  },
  // Study 3: God Loves Us
  "3": {
    title: "God Loves Us",
    intro: "The biggest question we can ask is not whether we love God, but whether we believe that He loves us. If we are certain of His love, everything changes.",
    sections: [
      { t: "God as Father and Mother", c: "We call God Father, but Isaiah 49:15 shows He loves us more than a mother loves her nursing child. He will never forget you. (Isaiah 49:15; Jeremiah 31:3)" },
      { t: "Love While Sinners", c: "God shows His love for us in that while we were still sinners, Christ died for us. He loved us first, before we even knew Him. (Romans 5:8; 1 John 4:19; John 3:16)" },
      { t: "Personal Care", c: "God is the Lord of the universe, yet He cares for each of us personally. Even the hairs of your head are all numbered. (Matthew 10:29-31; 1 Peter 5:7)" }
    ],
    reflections: ["Do you feel God's love is dependent on your performance?", "How does knowing God cares for sparrows help your anxiety?", "What does it mean that God loved us 'while we were still sinners'?"],
    keyVerses: ["John 3:16", "1 John 4:8", "Romans 5:8"]
  },
  // Study 4: Jesus is the Son of God
  "4": {
    title: "Jesus is the Son of God",
    intro: "Who is Jesus? Almost everyone admires Him, but the Bible claims He is much more than a great man or a religious guide.",
    sections: [
      { t: "The Son of the Living God", c: "Peter recognized that Jesus was not just a creature, but the Son of God—a divine reality that distinguished Him from all other men. (Matthew 16:15-17; John 20:28)" },
      { t: "The Anointed One", c: "Messiah means 'Anointed.' Jesus was the special king, prophet, and priest announced by the prophets to bring freedom and salvation. (Isaiah 9:6; Deuteronomy 18:15)" },
      { t: "God's Grace in Christ", c: "It was by God's grace that we can see Jesus as our Savior. We cannot understand His reality by ourselves; we need His help. (John 1:1-3; Colossians 2:9)" }
    ],
    reflections: ["What difference does it make that Jesus is the Son of God?", "Can we see Jesus' true divine essence beyond His human appearance?", "Why did Thomas call Jesus 'My Lord and my God'?"],
    keyVerses: ["Matthew 16:16", "John 20:31", "Acts 4:12"]
  },
  // Study 5: The Holy Spirit
  "5": {
    title: "The Holy Spirit",
    intro: "God's love and support did not end with Jesus' life on earth. They continue through the work of the Holy Spirit.",
    sections: [
      { t: "The Counselor", c: "Jesus promised He would not leave us alone. He sent the Counselor to be with us forever, guiding us into all truth. (John 14:16-17; John 16:7-13)" },
      { t: "The Spirit's Work", c: "The Holy Spirit helps us understand that we are sinners, shows us what is right, and helps us begin a new life as children of God. (John 16:8-11; Romans 8:26-27)" },
      { t: "The Gift of the Spirit", c: "We can enjoy the presence of the Holy Spirit simply by asking for Him in prayer. God is eager to give this gift to His children. (Luke 11:13; Acts 2:38)" }
    ],
    reflections: ["How have you felt the Spirit's guidance in your life?", "Why is it important that the Spirit is a person and not just a force?", "What is the fruit of the Spirit? (Galatians 5:22-23)"],
    keyVerses: ["John 14:26", "Romans 8:26", "Galatians 5:22-23"]
  },
  // Study 6: God Speaks Through the Bible
  "6": {
    title: "God Speaks Through the Bible",
    intro: "Christian faith does not arise from human search, but from God's revelation. He tells us who He is through His Word.",
    sections: [
      { t: "The Inspired Word", c: "The Bible is a collection of 66 books written by prophets and apostles, all inspired by God to reveal His will and the way of salvation. (2 Timothy 3:16-17; 2 Peter 1:20-21)" },
      { t: "The Foundation", c: "Apostles and prophets constitute the foundation of the church. We can only be Christians if we believe in the testimony they gave about Jesus. (Ephesians 2:20; John 5:39)" },
      { t: "A Lamp for Our Feet", c: "The Bible is not just for specialists; it's for everyone. It provides light on our path and helps us discover Jesus. (Psalm 119:105; Acts 17:11; James 1:22)" }
    ],
    reflections: ["How can we know the Bible is trustworthy?", "What is the purpose of Scripture in your daily life?", "How did the Bereans study the Scriptures?"],
    keyVerses: ["2 Timothy 3:16", "Hebrews 4:12", "Psalm 119:105"]
  },
  // Study 7: God is the Creator
  "7": {
    title: "God is the Powerful and Loving Creator",
    intro: "All Christians believe that God created 'the heavens and the earth'. But can we harmonize the Bible with what evolutionism says?",
    sections: [
      { t: "The Origin", c: "According to Genesis 1:1, God made everything. The world He created was 'very good'—perfectly corresponding to His plan of harmony. (Genesis 1:31; Psalm 33:6-9)" },
      { t: "Harmony Destroyed", c: "Evolutionism says violence and death are part of the world; the Bible teaches they come from sin and are the fruit of rebellion. (Genesis 3:17-19; Romans 5:12)" },
      { t: "A World of Peace", c: "In the beginning, no living being lived at the expense of another. It was a truly peaceful and extraordinary world. (Genesis 1:29-30; Isaiah 11:6-9)" }
    ],
    reflections: ["How can we sustain our faith in the Creator in today's culture?", "Why does the Bible emphasize 'it was good'?", "What hope does creation give us for the future?"],
    keyVerses: ["Genesis 1:1", "Colossians 1:16", "Revelation 4:11"]
  },
  // Study 8: God is Innocent of Suffering
  "8": {
    title: "God is Innocent of Our Sufferings",
    intro: "Too much suffering and disorder. How often are we tempted to blame God? But is it truly His responsibility?",
    sections: [
      { t: "The Two Trees", c: "In Eden were two special trees: the tree of life and the tree of knowledge. The tree of life represents our dependence on God for life itself. (Genesis 2:9, 16-17; Revelation 22:1-2)" },
      { t: "The Forbidden Choice", c: "Eating from the forbidden tree meant not trusting God and claiming a right that didn't belong to us. This sin opened the door to all others. (Genesis 3:1-6; James 1:13-15)" },
      { t: "The Fractures of Sin", c: "Sin broke our relationship with God, with each other, and even with nature. Death entered as the absence of the source of life. (Genesis 3:7-19; Romans 6:23)" }
    ],
    reflections: ["Why did God allow the possibility of evil?", "How does the cross answer the problem of suffering?", "What does 1 John 1:5 teach us about God's character?"],
    keyVerses: ["Romans 5:12", "James 1:13", "1 John 1:5"]
  },
  // Study 9: God Promises a Savior
  "9": {
    title: "God Promises a Savior",
    intro: "After sin, God could have abandoned us, but He did not. He opened the door of hope by promising a Savior.",
    sections: [
      { t: "The First Promise", c: "Immediately after sin, God promised a Savior who would crush the serpent's head, even while being 'bruised' in the process. (Genesis 3:15; Romans 16:20; Hebrews 2:14)" },
      { t: "The Progeny of Abraham", c: "God called Abraham and promised that through his descendants, all nations of the earth would be blessed. The Savior would come from Israel. (Genesis 12:1-3; Galatians 3:16)" },
      { t: "The Tribe of Judah", c: "Prophecy pointed to the tribe of Judah as the royal line until the arrival of 'Shiloh,' the one who has the right to govern the world. (Genesis 49:10; Isaiah 9:6-7)" }
    ],
    reflections: ["How do ancient prophecies build your faith in Jesus today?", "What does 'the fullness of time' mean to you?", "Why did God use a 'seed' as a symbol of the Savior?"],
    keyVerses: ["Genesis 3:15", "Isaiah 9:6", "Galatians 4:4"]
  },
  // Study 10: Jesus Our Savior
  "10": {
    title: "Jesus Our Savior",
    intro: "Life is not what it should be. We feel called to something better but don't know how to reach it. We need someone to bring us home.",
    sections: [
      { t: "Saved from Sin", c: "Salvation fundamentally brings us out of the state of sin, which is alienation and death. Jesus took our sin upon Himself to reconcile us with God. (1 Peter 2:24; 2 Corinthians 5:21)" },
      { t: "The Only Mediator", c: "Jesus is unique because He is both human and divine. He alone can unite humanity with divinity and offer His sinless life in our place. (1 Timothy 2:5; Hebrews 4:14-16)" },
      { t: "A Free Gift", c: "Salvation is a gift of God's grace. We cannot earn it or pay for it; we simply receive it by believing in Jesus. (Ephesians 2:8-9; John 1:12; Romans 10:9-10)" }
    ],
    reflections: ["Can we think of 'paying' for Jesus' sacrifice?", "What does it mean to you that Jesus is your Advocate?", "How do we receive the gift of salvation?"],
    keyVerses: ["John 3:16", "1 Peter 2:24", "2 Corinthians 5:21"]
  },
  // Study 11: Isaiah 53
  "11": {
    title: "Isaiah 53: The Gospel of the Old Testament",
    intro: "The prophet Isaiah saw with spiritual eyes exactly what would happen to Jesus. His description of the Savior's sacrifice is profound and clear.",
    sections: [
      { t: "The Despised Savior", c: "The Savior was despised and rejected, a man of suffering familiar with pain. He had no outward majesty to attract us; His beauty was in His love. (Isaiah 53:2-3; John 1:10-11)" },
      { t: "Bearing Our Sickness", c: "He took up our pain and bore our suffering. He was pierced for our transgressions and crushed for our iniquities. By His wounds, we are healed. (Isaiah 53:4-6; 1 Peter 2:24)" },
      { t: "The Victorious Sacrifice", c: "Though He was led like a lamb to the slaughter, He did not protest. His death was a voluntary act of love that justifies many. (Isaiah 53:7-12; John 10:17-18)" }
    ],
    reflections: ["How would you have reacted to Jesus' cross?", "Why did God choose to save us through suffering?", "What does Isaiah 53 teach us about God's character?"],
    keyVerses: ["Isaiah 53:5", "Isaiah 53:6", "1 Peter 2:24"]
  },
  // Study 12: Jesus, Who is He?
  "12": {
    title: "Jesus, Who is He?",
    intro: "There is something extraordinary about Jesus' nature. Even the wind and sea obeyed Him. Who is He truly?",
    sections: [
      { t: "Not a Creature", c: "Jesus is the Creator who existed before all things. He is not a created being, but the one through whom all things were made. (John 1:1-3; Colossians 1:15-17; Hebrews 1:1-3)" },
      { t: "Truly God", c: "Jesus is God together with the Father. He is 'Immanuel,' which means God with us. He shares the Father's nature and essence. (John 10:30; John 8:58; Colossians 2:9)" },
      { t: "The Word Made Flesh", c: "Jesus fully assumed our human nature that He might reach our needs. In Him, the whole fullness of the Godhead dwells bodily. (John 1:14; Philippians 2:5-8; Hebrews 2:14)" }
    ],
    reflections: ["Why is the divinity of Jesus essential to our salvation?", "What does 'God with us' mean in your daily struggles?", "How can Jesus be both fully God and fully man?"],
    keyVerses: ["John 1:1", "Colossians 1:15", "Hebrews 1:3"]
  },
  // Study 13: Jesus Returns
  "13": {
    title: "Jesus Returns",
    intro: "Suffering and death still exist, but we are saved in hope. This salvation will be fully realized when Jesus returns to restore all things.",
    sections: [
      { t: "The Blessed Hope", c: "The promise of Jesus' return is the center of Christian hope. He will return personally, literally, and visibly on the clouds of heaven. (Acts 1:9-11; Titus 2:13; Matthew 24:30)" },
      { t: "The Purpose", c: "Jesus returns to judge the world, to take His children home, and to regenerate this world corrupted by sin. (John 14:1-3; Matthew 25:31-33; 2 Peter 3:13)" },
      { t: "The Resurrection", c: "When He returns, the dead in Christ will rise first, and the living believers will be transformed and taken with Him. (1 Thessalonians 4:16-17; 1 Corinthians 15:51-54)" }
    ],
    reflections: ["How does the promise of the Second Coming change your perspective on death?", "Are you living in readiness for His appearing?", "What does it mean to 'watch and pray'?"],
    keyVerses: ["John 14:1-3", "Acts 1:11", "1 Thessalonians 4:16-17"]
  },
  // Study 14: Signs of the Times
  "14": {
    title: "Signs of the Times",
    intro: "Jesus gave us signs to watch for—not to frighten us, but to prepare us and fill us with hope.",
    sections: [
      { t: "Wars and Rumors of Wars", c: "Jesus predicted increasing conflict and international tension before His return. (Matthew 24:6-7)" },
      { t: "Natural Disasters", c: "Earthquakes, famines, and pestilences in various places are signs of the approaching end. (Matthew 24:7; Luke 21:11)" },
      { t: "Moral Decline", c: "Society would experience a breakdown of morality, love growing cold, and people becoming lovers of themselves. (2 Timothy 3:1-5; Matthew 24:12)" }
    ],
    reflections: ["How can we balance watching for signs while not predicting dates?", "What does it mean to be 'ready' for Christ's return?"],
    keyVerses: ["Matthew 24:36", "Mark 13:32", "Acts 1:7"]
  },
  // Study 15: Our Heavenly Experience (Millennium)
  "15": {
    title: "Our Heavenly Experience (Millennium)",
    intro: "What happens between Christ's return and the final establishment of God's kingdom? The Bible reveals a thousand-year period of judgment and rest.",
    sections: [
      { t: "The Saints in Heaven", c: "The righteous will reign with Christ for a thousand years, participating in the judgment of the wicked. (Revelation 20:4-6; 1 Corinthians 6:2-3)" },
      { t: "The Earth Desolate", c: "Satan is bound by circumstances, left alone on a desolate earth with no one to tempt. (Revelation 20:1-3; Jeremiah 4:23-26)" },
      { t: "The End of Evil", c: "At the end of the millennium, the wicked are resurrected, Satan is released, and the final judgment takes place. (Revelation 20:7-10; Ezekiel 28:18-19)" }
    ],
    reflections: ["How does the millennium demonstrate God's justice?", "What is the purpose of the saints judging the world?"],
    keyVerses: ["Revelation 20:4", "Revelation 20:6", "1 Corinthians 6:2"]
  },
  // Study 16: Our Eternal Home
  "16": {
    title: "Our Eternal Home in the New Earth",
    intro: "God's plan culminates in a new creation—a restored earth where righteousness dwells and God's presence brings eternal joy.",
    sections: [
      { t: "The New Heavens and New Earth", c: "God will create a new heaven and a new earth where righteousness dwells. (2 Peter 3:13; Revelation 21:1; Isaiah 65:17)" },
      { t: "No More Sorrow", c: "God will wipe away every tear; there will be no more death, sorrow, crying, or pain. (Revelation 21:4; Isaiah 35:10)" },
      { t: "The Tree of Life", c: "The tree of life will be restored, and God's people will serve Him forever in perfect harmony. (Revelation 22:1-5; Genesis 3:22-24)" }
    ],
    reflections: ["What are you most looking forward to in the new earth?", "How does this hope affect your life today?"],
    keyVerses: ["Revelation 21:1", "Revelation 21:4", "Isaiah 65:17"]
  },
  // Study 17: The Law of God
  "17": {
    title: "The Law of God",
    intro: "What is the purpose of God's law? Is it still relevant for Christians today? The Bible gives us clear answers.",
    sections: [
      { t: "The Ten Commandments", c: "God wrote His law on stone tablets with His own finger, showing its eternal and unchanging nature. (Exodus 20:1-17; Deuteronomy 4:13)" },
      { t: "The Purpose of the Law", c: "The law shows us what sin is and points us to our need for a Savior. It is a mirror that reveals our shortcomings. (Romans 3:20; Romans 7:7; Galatians 3:24)" },
      { t: "The Law in the Heart", c: "Under the new covenant, God writes His law in our hearts. Obedience flows from love, not legalism. (Jeremiah 31:33; Hebrews 8:10; John 14:15)" }
    ],
    reflections: ["How does the law show God's character?", "What is the difference between legalism and loving obedience?", "How can we keep the law without being legalistic?"],
    keyVerses: ["Exodus 20:1-17", "Romans 7:12", "1 John 5:3"]
  },
  // Study 18: The Sabbath
  "18": {
    title: "The Sabbath: A Day of Rest",
    intro: "The Sabbath is more than just a day off—it's a gift from God, a sign of His creative and redemptive power.",
    sections: [
      { t: "The Original Sabbath", c: "God established the Sabbath at creation, blessing the seventh day and making it holy. It was made for all humanity, not just Israel. (Genesis 2:2-3; Mark 2:27)" },
      { t: "The Fourth Commandment", c: "The Sabbath is enshrined in the Ten Commandments as a memorial of creation and a sign of our relationship with God. (Exodus 20:8-11)" },
      { t: "Jesus and the Sabbath", c: "Jesus honored the Sabbath and taught that it was made for our benefit—a day for doing good and drawing closer to God. (Luke 4:16; Matthew 12:10-12; Mark 2:28)" }
    ],
    reflections: ["How does the Sabbath connect us to creation?", "What does it mean to find rest in God?", "How can we make the Sabbath a delight?"],
    keyVerses: ["Genesis 2:2-3", "Exodus 20:8-11", "Mark 2:27"]
  },
  // Study 19: The Sanctuary
  "19": {
    title: "The Sanctuary: A Picture of Salvation",
    intro: "The earthly sanctuary was a model of God's plan of salvation, pointing forward to the work of Jesus as our High Priest.",
    sections: [
      { t: "The Earthly Model", c: "God instructed Moses to build a sanctuary as a copy of the heavenly original, where He would dwell among His people. (Exodus 25:8-9; Hebrews 8:5)" },
      { t: "The Sacrificial System", c: "The animal sacrifices pointed to Jesus, the Lamb of God who takes away the sin of the world. (Leviticus 4; John 1:29; Hebrews 10:1-4)" },
      { t: "The Day of Atonement", c: "Once a year, the sanctuary was cleansed, symbolizing the final judgment and the complete removal of sin. (Leviticus 16; Hebrews 9:11-14)" }
    ],
    reflections: ["How does the sanctuary help us understand salvation?", "What does Jesus' work as our High Priest mean for you today?"],
    keyVerses: ["Exodus 25:8", "Hebrews 8:1-2", "Hebrews 9:11-12"]
  },
  // Study 20: Salvation by Faith Alone
  "20": {
    title: "Salvation by Faith Alone",
    intro: "Can we be saved by our good works? Or is salvation a free gift? The Bible is clear on this essential truth.",
    sections: [
      { t: "Not by Works", c: "We are saved by grace through faith, not by works, so that no one can boast. Good works are the fruit of salvation, not the root. (Ephesians 2:8-9; Titus 3:5)" },
      { t: "The Example of Abraham", c: "Abraham was counted as righteous because he believed God, not because of his works. His faith was demonstrated by his actions. (Genesis 15:6; Romans 4:2-3; James 2:21-23)" },
      { t: "Faith That Works", c: "True faith produces good works. We are saved by faith alone, but saving faith is never alone—it transforms our lives. (James 2:17-18; Galatians 5:6)" }
    ],
    reflections: ["Why is it important that salvation is a gift?", "What is the relationship between faith and works?", "How does assurance of salvation affect your daily life?"],
    keyVerses: ["Ephesians 2:8-9", "Romans 3:28", "Galatians 2:16"]
  },
  // Study 21: The Church
  "21": {
    title: "The Church: The Body of Christ",
    intro: "The church is not a building—it's a community of believers called to represent Jesus and share His love with the world.",
    sections: [
      { t: "The Body of Christ", c: "The church is the body of Christ, with Jesus as the head. Each member has a unique role and gift to contribute. (1 Corinthians 12:12-27; Ephesians 1:22-23)" },
      { t: "The Purpose of the Church", c: "The church exists to worship God, grow believers in their faith, and share the gospel with the world. (Matthew 28:19-20; Acts 2:42-47)" },
      { t: "Unity in Diversity", c: "Though we are many members, we are one body in Christ. Our differences should unite us, not divide us. (Romans 12:4-5; Ephesians 4:4-6)" }
    ],
    reflections: ["What is your role in the body of Christ?", "How can we promote unity in the church?", "What does it mean to be the hands and feet of Jesus?"],
    keyVerses: ["1 Corinthians 12:12-27", "Ephesians 1:22-23", "Colossians 1:18"]
  },
  // Study 22: Baptism
  "22": {
    title: "Baptism: A Step of Faith",
    intro: "Baptism is an outward symbol of an inward change—a public declaration of our commitment to follow Jesus.",
    sections: [
      { t: "The Meaning of Baptism", c: "Baptism symbolizes death to sin, burial of the old life, and resurrection to new life in Christ. (Romans 6:3-4; Colossians 2:12)" },
      { t: "Jesus' Example", c: "Jesus Himself was baptized, setting an example for us to follow. (Matthew 3:13-17; Mark 1:9-11)" },
      { t: "The Great Commission", c: "Jesus commanded His disciples to baptize new believers as a sign of their faith. (Matthew 28:19-20; Acts 2:38)" }
    ],
    reflections: ["What does baptism represent in your spiritual journey?", "Why is baptism by immersion significant?"],
    keyVerses: ["Romans 6:3-4", "Matthew 28:19", "Acts 2:38"]
  },
  // Study 23: Spiritual Gifts
  "23": {
    title: "Spiritual Gifts",
    intro: "God gives each believer unique gifts to build up the church and serve others. Discover your gifts and use them for His glory.",
    sections: [
      { t: "Gifts of the Spirit", c: "The Holy Spirit distributes gifts to believers as He wills, for the common good of the church. (1 Corinthians 12:7-11; Romans 12:6-8)" },
      { t: "The Greatest Gift", c: "Love is the most excellent way. Without love, even the most spectacular gifts are meaningless. (1 Corinthians 13:1-13)" },
      { t: "Using Your Gifts", c: "Each of us has been given gifts to serve others. We are called to be faithful stewards of God's grace. (1 Peter 4:10-11; Ephesians 4:11-13)" }
    ],
    reflections: ["What spiritual gifts do you see in your life?", "How can you use your gifts to serve others?"],
    keyVerses: ["1 Corinthians 12:4-11", "Romans 12:6-8", "1 Peter 4:10"]
  },
  // Study 24: Prayer
  "24": {
    title: "Prayer: Connecting with God",
    intro: "Prayer is our lifeline to God—a two-way conversation that deepens our relationship with our heavenly Father.",
    sections: [
      { t: "The Model Prayer", c: "Jesus taught His disciples how to pray, giving us a pattern for our prayer lives. (Matthew 6:9-13; Luke 11:1-4)" },
      { t: "Pray Without Ceasing", c: "We are called to pray continually, bringing every concern to God with thanksgiving. (1 Thessalonians 5:17; Philippians 4:6-7)" },
      { t: "God Hears Us", c: "When we pray according to God's will, He hears us and answers according to His wisdom and love. (1 John 5:14-15; James 5:16)" }
    ],
    reflections: ["How can you make prayer a daily habit?", "What obstacles keep you from praying regularly?"],
    keyVerses: ["Matthew 6:9-13", "Philippians 4:6", "1 Thessalonians 5:17"]
  },
  // Study 25: The Lord's Supper
  "25": {
    title: "The Lord's Supper",
    intro: "The communion service is a sacred reminder of Jesus' sacrifice and our unity as believers in Him.",
    sections: [
      { t: "The Last Supper", c: "On the night before His death, Jesus shared a final meal with His disciples and instituted the communion service. (Matthew 26:26-29; Luke 22:19-20)" },
      { t: "Remembering His Sacrifice", c: "The bread and wine symbolize Jesus' body broken for us and His blood shed for the forgiveness of sins. (1 Corinthians 11:23-26)" },
      { t: "Self-Examination", c: "We are called to examine our hearts before participating in communion, ensuring we approach the table with reverence. (1 Corinthians 11:27-32)" }
    ],
    reflections: ["What does communion mean to you personally?", "How does this service draw you closer to Jesus?"],
    keyVerses: ["Luke 22:19-20", "1 Corinthians 11:23-26", "1 Corinthians 10:16"]
  },
  // Study 26: Stewardship
  "26": {
    title: "Stewardship: Managing God's Gifts",
    intro: "Everything we have comes from God. We are called to be faithful stewards of His resources—our time, talents, and treasures.",
    sections: [
      { t: "God Owns Everything", c: "The earth is the Lord's, and everything in it. We are managers, not owners, of what God has entrusted to us. (Psalm 24:1; 1 Chronicles 29:11-14)" },
      { t: "Faithful Stewardship", c: "God requires us to be faithful with what He has given us, using our resources for His glory and the good of others. (Matthew 25:14-30; Luke 16:10-12)" },
      { t: "Giving Generously", c: "God loves a cheerful giver. Our giving should be generous, joyful, and proportionate to what we have received. (2 Corinthians 9:6-8; Proverbs 3:9-10)" }
    ],
    reflections: ["How can you be a better steward of God's gifts?", "What does generous giving look like in your life?"],
    keyVerses: ["Psalm 24:1", "Malachi 3:10", "2 Corinthians 9:7"]
  },
  // Study 27: Marriage and Family
  "27": {
    title: "Marriage and Family",
    intro: "God designed marriage and family as the foundation of society. His Word gives us principles for building strong, loving relationships.",
    sections: [
      { t: "God's Design for Marriage", c: "Marriage is a sacred covenant between a man and a woman, reflecting Christ's relationship with His church. (Genesis 2:24; Matthew 19:4-6; Ephesians 5:31-32)" },
      { t: "Love and Respect", c: "Husbands are called to love their wives sacrificially; wives are called to respect their husbands. Both are to submit to one another out of reverence for Christ. (Ephesians 5:21-33; 1 Peter 3:1-7)" },
      { t: "Raising Children", c: "Children are a blessing from God. Parents are called to raise them in the training and instruction of the Lord. (Psalm 127:3; Proverbs 22:6; Ephesians 6:4)" }
    ],
    reflections: ["What principles from Scripture can strengthen your marriage?", "How can parents effectively pass faith to their children?"],
    keyVerses: ["Genesis 2:24", "Ephesians 5:31-33", "Proverbs 22:6"]
  },
  // Study 28: Heaven and Hell
  "28": {
    title: "Heaven and Hell",
    intro: "What happens after death? The Bible gives us clear answers about the destiny of the righteous and the wicked.",
    sections: [
      { t: "The State of the Dead", c: "When people die, they sleep in the grave until the resurrection. The dead know nothing. (Ecclesiastes 9:5-6; John 11:11-14; Psalm 146:4)" },
      { t: "The Resurrection of the Righteous", c: "At Christ's return, the righteous will be resurrected to eternal life in heaven. (1 Thessalonians 4:16-17; 1 Corinthians 15:51-54)" },
      { t: "The Final Destruction of the Wicked", c: "The wicked will be destroyed in the lake of fire—not tortured eternally, but consumed completely. (Malachi 4:1-3; Revelation 20:9-10; Matthew 10:28)" }
    ],
    reflections: ["How does the biblical teaching on death give you comfort?", "What does it mean that God is both just and merciful?"],
    keyVerses: ["Ecclesiastes 9:5", "John 5:28-29", "Revelation 20:9"]
  },
  // Study 29: The Great Controversy
  "29": {
    title: "The Great Controversy",
    intro: "The Bible reveals a cosmic conflict between good and evil—between Christ and Satan—that began in heaven and continues on earth.",
    sections: [
      { t: "War in Heaven", c: "Satan rebelled against God in heaven, taking a third of the angels with him. This conflict was brought to earth. (Revelation 12:7-9; Isaiah 14:12-14; Ezekiel 28:14-17)" },
      { t: "God's Character Revealed", c: "The great controversy is ultimately about God's character. Satan has accused God of being unfair, and Christ came to reveal the truth about the Father. (Job 1-2; John 14:9; Romans 3:26)" },
      { t: "Our Role", c: "We are participants in this conflict. Through Christ, we can overcome the enemy and demonstrate God's love to the world. (Ephesians 6:10-18; Revelation 12:11)" }
    ],
    reflections: ["How does the great controversy help explain suffering?", "What is your role in God's victory over evil?"],
    keyVerses: ["Revelation 12:7-9", "Ephesians 6:12", "Romans 8:31-39"]
  },
  // Study 30: The Remnant Church
  "30": {
    title: "The Remnant Church",
    intro: "Throughout history, God has preserved a faithful remnant—a people who keep His commandments and hold to the testimony of Jesus.",
    sections: [
      { t: "Characteristics of the Remnant", c: "The remnant church keeps the commandments of God and has the testimony of Jesus, which is the spirit of prophecy. (Revelation 12:17; Revelation 14:12)" },
      { t: "The Final Call", c: "The three angels' messages of Revelation 14 call the world to worship the Creator, reject false worship, and prepare for Christ's return. (Revelation 14:6-12)" },
      { t: "Global Mission", c: "The gospel must be preached to every nation before the end comes. The remnant church is commissioned to share this message. (Matthew 24:14; Revelation 18:1-4)" }
    ],
    reflections: ["What does it mean to be part of God's remnant people?", "How can you share the three angels' messages in love?"],
    keyVerses: ["Revelation 12:17", "Revelation 14:12", "Matthew 24:14"]
  },
  // Study 31: The Seal of God
  "31": {
    title: "The Seal of God and the Mark of the Beast",
    intro: "In the last days, every person will make a choice: to receive the seal of God or the mark of the beast. What do these symbols mean?",
    sections: [
      { t: "The Seal of God", c: "God's seal is placed on the foreheads of those who honor Him and keep His commandments. It signifies ownership and protection. (Revelation 7:1-4; Ezekiel 9:4; Ephesians 1:13-14)" },
      { t: "The Sabbath as a Sign", c: "The Sabbath is the sign of God's creative and redemptive power—a weekly reminder of our relationship with Him. (Ezekiel 20:12, 20; Exodus 31:13-17)" },
      { t: "The Mark of the Beast", c: "The mark of the beast represents allegiance to a counterfeit system of worship. It involves a choice to disobey God's law. (Revelation 13:16-17; Revelation 14:9-11)" }
    ],
    reflections: ["What does it mean to be sealed by God?", "How does the Sabbath connect to worship of the Creator?"],
    keyVerses: ["Revelation 7:1-4", "Ezekiel 20:12", "Revelation 14:9-11"]
  },
  // Study 32: Babylon in Prophecy
  "32": {
    title: "Babylon in Prophecy",
    intro: "The Bible uses Babylon as a symbol of false religious systems that have departed from God's truth and persecuted His people.",
    sections: [
      { t: "The Original Babylon", c: "The tower of Babel was humanity's first attempt to unite in rebellion against God. Babylon represents confusion and false worship. (Genesis 11:1-9; Revelation 17:5)" },
      { t: "Mystery Babylon", c: "Revelation describes a religious system that has corrupted the earth and persecuted God's faithful people. God calls His people to come out of her. (Revelation 17:1-6; Revelation 18:1-4)" },
      { t: "Babylon's Fall", c: "Babylon will ultimately fall, and God's people will be delivered. The true church will triumph. (Revelation 18:21-24; Revelation 19:1-2)" }
    ],
    reflections: ["What does it mean to 'come out of Babylon'?", "How can we stay faithful when many around us compromise?"],
    keyVerses: ["Revelation 18:4", "Revelation 17:5", "Jeremiah 51:6"]
  },
  // Study 33: Overcoming Sin
  "33": {
    title: "Overcoming Sin",
    intro: "Is victory over sin really possible? Through the power of the Holy Spirit, we can live transformed lives that honor God.",
    sections: [
      { t: "Victory Through Christ", c: "We cannot overcome sin in our own strength, but through Christ who strengthens us, victory is possible. (Romans 7:18-25; Philippians 4:13)" },
      { t: "Walking in the Spirit", c: "If we live by the Spirit, we will not gratify the desires of the sinful nature. The Spirit produces His fruit in our lives. (Galatians 5:16-25; Romans 8:1-4)" },
      { t: "Confession and Forgiveness", c: "When we sin, we have an Advocate with the Father. If we confess our sins, He is faithful to forgive us. (1 John 1:9; 1 John 2:1)" }
    ],
    reflections: ["What areas of your life need God's transforming power?", "How does grace empower us to overcome sin?"],
    keyVerses: ["Romans 8:1-4", "Galatians 5:16", "1 John 1:9"]
  },
  // Study 34: The Christian Walk
  "34": {
    title: "The Christian Walk",
    intro: "Following Jesus is a daily journey of growing in faith, character, and love. How do we walk in a manner worthy of our calling?",
    sections: [
      { t: "Putting Off the Old Self", c: "We are called to put off our old sinful nature, which is being corrupted by deceitful desires. (Ephesians 4:22-24; Colossians 3:5-10)" },
      { t: "Putting On the New Self", c: "We put on compassion, kindness, humility, gentleness, and patience—clothing ourselves with Christ. (Colossians 3:12-14; Galatians 5:22-23)" },
      { t: "Walking in Love", c: "Follow God's example as beloved children, walking in love just as Christ loved us. (Ephesians 5:1-2; John 13:34-35)" }
    ],
    reflections: ["What does it mean to 'put on Christ' daily?", "How can you grow in the fruit of the Spirit?"],
    keyVerses: ["Ephesians 4:22-24", "Colossians 3:12-14", "Galatians 5:22-23"]
  },
  // Study 35: Faith and Works
  "35": {
    title: "Faith and Works",
    intro: "We are saved by faith alone, but genuine faith always produces good works. How do faith and works work together?",
    sections: [
      { t: "Faith Without Works Is Dead", c: "Faith that does not produce action is not saving faith. True faith transforms how we live. (James 2:14-26)" },
      { t: "Works as Evidence", c: "Good works don't save us, but they demonstrate that our faith is genuine. They are the fruit of salvation. (Matthew 7:16-20; Titus 2:14)" },
      { t: "Prepared for Good Works", c: "We are God's workmanship, created in Christ Jesus for good works that God prepared for us. (Ephesians 2:10; 1 Peter 2:12)" }
    ],
    reflections: ["How can you ensure your faith is producing good fruit?", "What good works has God prepared for you to do?"],
    keyVerses: ["James 2:17", "Ephesians 2:10", "Titus 2:14"]
  },
  // Study 36: Trials and Temptations
  "36": {
    title: "Trials and Temptations",
    intro: "Why does God allow trials in our lives? How can we overcome temptation and grow through difficult circumstances?",
    sections: [
      { t: "Testing Produces Perseverance", c: "Trials test our faith and produce perseverance, maturity, and completeness in our character. (James 1:2-4; Romans 5:3-5)" },
      { t: "God Provides a Way Out", c: "God is faithful; He will not let you be tempted beyond what you can bear. He always provides a way of escape. (1 Corinthians 10:13)" },
      { t: "Comfort in Suffering", c: "God comforts us in our trials so we can comfort others with the same comfort we received. (2 Corinthians 1:3-5; 1 Peter 5:10)" }
    ],
    reflections: ["How have trials strengthened your faith?", "How can you comfort others going through difficulties?"],
    keyVerses: ["James 1:2-4", "1 Corinthians 10:13", "Romans 8:28"]
  },
  // Study 37: The 2,300 Days Prophecy
  "37": {
    title: "The 2,300 Days Prophecy",
    intro: "One of the longest time prophecies in the Bible, the 2,300 days of Daniel 8 points to the beginning of Christ's final work as High Priest.",
    sections: [
      { t: "The Vision of Daniel 8", c: "Daniel saw a vision of a ram, a goat, and a little horn—symbols of world empires leading to the time of the end. (Daniel 8:1-14)" },
      { t: "The 2,300 Days", c: "The prophecy of 2,300 days (years) points to the cleansing of the sanctuary—the beginning of the judgment in heaven. (Daniel 8:14; Daniel 9:24-27)" },
      { t: "The Year-Day Principle", c: "In Bible prophecy, a day represents a year. This principle is key to understanding prophetic time periods. (Ezekiel 4:6; Numbers 14:34)" }
    ],
    reflections: ["How does this prophecy strengthen your confidence in God's Word?", "What does the cleansing of the sanctuary mean for you today?"],
    keyVerses: ["Daniel 8:14", "Daniel 9:24-27", "Numbers 14:34"]
  },
  // Study 38: The Antichrist
  "38": {
    title: "The Antichrist",
    intro: "The Bible warns of an antichrist power that would oppose God and deceive many. What are its identifying marks?",
    sections: [
      { t: "The Man of Sin", c: "Paul described a power that would exalt itself above God, oppose true worship, and deceive many. (2 Thessalonians 2:1-12)" },
      { t: "The Little Horn of Daniel", c: "Daniel's little horn power uprooted three horns, spoke against God, and thought to change times and law. (Daniel 7:8, 24-25)" },
      { t: "The Beast of Revelation", c: "John saw a beast rising from the sea with blasphemous names. It received a deadly wound that was healed. (Revelation 13:1-10)" }
    ],
    reflections: ["How can we recognize false teachings today?", "Why is it important to understand prophecy?"],
    keyVerses: ["2 Thessalonians 2:3-4", "Daniel 7:25", "Revelation 13:1-10"]
  },
  // Study 39: The United States in Prophecy
  "39": {
    title: "The United States in Prophecy",
    intro: "Revelation 13 describes a second beast that rises from the earth—a nation that would speak like a lamb but later exercise great power.",
    sections: [
      { t: "The Beast from the Earth", c: "This beast has two horns like a lamb, representing a nation that appears Christian and peaceful. (Revelation 13:11)" },
      { t: "Speaking Like a Dragon", c: "Eventually, this nation exercises authority like the first beast, enforcing religious laws and opposing God's people. (Revelation 13:11-15)" },
      { t: "The Image to the Beast", c: "An image to the first beast will be created, and all who refuse to worship it will face persecution. (Revelation 13:14-15; Revelation 14:9-11)" }
    ],
    reflections: ["What does it mean to 'worship the beast'?", "How can we prepare for challenges to religious liberty?"],
    keyVerses: ["Revelation 13:11-18", "Revelation 14:9-11"]
  },
  // Study 40: The Three Angels' Messages
  "40": {
    title: "The Three Angels' Messages",
    intro: "God's final warning to the world is summarized in three powerful messages calling humanity to worship the Creator and reject false systems of worship.",
    sections: [
      { t: "First Angel: Worship the Creator", c: "Fear God, give Him glory, and worship the One who made heaven, earth, sea, and springs of water. (Revelation 14:6-7)" },
      { t: "Second Angel: Babylon Is Fallen", c: "Babylon has fallen—the false religious systems that have corrupted the earth. God calls His people out. (Revelation 14:8; Revelation 18:1-4)" },
      { t: "Third Angel: Don't Receive the Mark", c: "Those who worship the beast and receive its mark will face God's wrath. The saints keep God's commandments and faith in Jesus. (Revelation 14:9-12)" }
    ],
    reflections: ["How can you share these messages with love and grace?", "What does it mean to worship the Creator today?"],
    keyVerses: ["Revelation 14:6-12", "Revelation 18:4"]
  },
  // Study 41: The Investigative Judgment
  "41": {
    title: "The Investigative Judgment",
    intro: "Before Christ returns, a judgment takes place in heaven, examining the lives of those who claim to follow God.",
    sections: [
      { t: "The Judgment Scene", c: "Daniel saw thrones set up and the Ancient of Days seated. Books were opened, and judgment began. (Daniel 7:9-10)" },
      { t: "The Cleansing of the Sanctuary", c: "The 2,300-day prophecy points to the cleansing of the sanctuary—the beginning of the judgment. (Daniel 8:14; Leviticus 16)" },
      { t: "Our High Priest", c: "Jesus is our Advocate in the judgment, pleading His blood on our behalf. We can have confidence in His intercession. (Hebrews 7:25; 1 John 2:1)" }
    ],
    reflections: ["How does the judgment give you confidence in God's justice?", "What does Jesus' work as our Advocate mean to you?"],
    keyVerses: ["Daniel 7:9-10", "Hebrews 7:25", "1 John 2:1"]
  },
  // Study 42: The Day of the Lord
  "42": {
    title: "The Day of the Lord",
    intro: "The Bible speaks of a coming 'day of the Lord'—a time of judgment and deliverance that will change everything.",
    sections: [
      { t: "A Day of Judgment", c: "The day of the Lord is a time of reckoning, when God will judge the world and vindicate His people. (Joel 2:1-11; Zephaniah 1:14-18)" },
      { t: "A Day of Deliverance", c: "For God's faithful people, the day of the Lord is a day of salvation and deliverance. (Joel 2:32; Romans 10:13)" },
      { t: "The Great Day of God Almighty", c: "The kings of the earth will gather for battle at Armageddon, but the Lord will triumph. (Revelation 16:14-16; Revelation 19:11-21)" }
    ],
    reflections: ["How can you prepare for the day of the Lord?", "What does it mean that God's people have nothing to fear?"],
    keyVerses: ["Joel 2:31", "Zephaniah 1:14-18", "Revelation 16:14-16"]
  },
  // Study 43: The New Jerusalem
  "43": {
    title: "The New Jerusalem",
    intro: "The capital of the new earth, the New Jerusalem is a glorious city prepared by God for His people. What awaits us there?",
    sections: [
      { t: "A City Prepared", c: "Jesus is preparing a place for us in the New Jerusalem, a city with foundations whose architect is God. (John 14:1-3; Hebrews 11:10; Revelation 21:2)" },
      { t: "The City's Beauty", c: "The city is described with walls of jasper, streets of pure gold, and twelve gates of pearl. Its glory is beyond imagination. (Revelation 21:10-21)" },
      { t: "God's Presence", c: "The glory of God illuminates the city, and there is no need for sun or moon. God Himself dwells with His people. (Revelation 21:22-27; Revelation 22:3-5)" }
    ],
    reflections: ["What aspect of heaven are you most excited about?", "How does the hope of heaven affect your daily choices?"],
    keyVerses: ["Revelation 21:1-4", "John 14:1-3", "Hebrews 11:10"]
  },
  // Study 44: Worship
  "44": {
    title: "Worship",
    intro: "Worship is more than singing songs—it's a lifestyle of honoring God with our whole being. What does true worship look like?",
    sections: [
      { t: "Worship in Spirit and Truth", c: "Jesus said true worshipers will worship the Father in spirit and truth. Worship flows from the heart, not just external actions. (John 4:23-24)" },
      { t: "The Heart of Worship", c: "Worship is responding to God's worth with love, obedience, and praise. It's about God, not us. (Psalm 95:1-7; Romans 12:1)" },
      { t: "Worship in Community", c: "We worship together as a church family, encouraging one another through psalms, hymns, and spiritual songs. (Colossians 3:16; Hebrews 10:24-25)" }
    ],
    reflections: ["How can you worship God in your daily life?", "What does it mean to worship 'in spirit and truth'?"],
    keyVerses: ["John 4:23-24", "Romans 12:1", "Psalm 95:6-7"]
  },
  // Study 45: The Latter Rain
  "45": {
    title: "The Latter Rain",
    intro: "Before the end, God promises to pour out His Spirit in unprecedented measure—a latter rain to finish His work on earth.",
    sections: [
      { t: "The Early and Latter Rain", c: "In Israel, the early rain prepared the ground, and the latter rain ripened the harvest. So God's Spirit prepares and empowers His church. (Joel 2:23; James 5:7-8)" },
      { t: "Pentecost and the End", c: "The early rain fell at Pentecost, empowering the early church. The latter rain will come before the end to finish the work. (Acts 2:1-4; Acts 2:17-21)" },
      { t: "Preparing for the Latter Rain", c: "We prepare by seeking God, confessing our sins, and allowing the Spirit to transform our lives. (Zechariah 10:1; Acts 1:8)" }
    ],
    reflections: ["How can you prepare to receive the latter rain?", "What would happen if the church experienced a Pentecost today?"],
    keyVerses: ["Joel 2:23", "James 5:7-8", "Acts 2:17-21"]
  },
  // Study 46: Health and Wholeness
  "46": {
    title: "Health and Wholeness",
    intro: "God cares about our physical health as well as our spiritual well-being. The Bible gives principles for healthy living.",
    sections: [
      { t: "Our Bodies Are Temples", c: "Our bodies are temples of the Holy Spirit. We honor God by caring for our physical health. (1 Corinthians 6:19-20; 1 Corinthians 10:31)" },
      { t: "The Health Message", c: "God's original diet was plant-based, and He desires us to live in health and wholeness. (Genesis 1:29; Isaiah 66:2)" },
      { t: "Rest and Renewal", c: "God created our bodies to need rest. The Sabbath is a weekly gift for physical and spiritual renewal. (Exodus 20:8-11; Mark 2:27)" }
    ],
    reflections: ["How can you better care for your body as God's temple?", "What lifestyle changes might improve your health?"],
    keyVerses: ["1 Corinthians 6:19-20", "Genesis 1:29", "1 Corinthians 10:31"]
  },
  // Study 47: Angels
  "47": {
    title: "Angels: God's Messengers",
    intro: "Angels are real beings created by God to serve Him and minister to His people. What does the Bible reveal about these heavenly beings?",
    sections: [
      { t: "Angels as Ministers", c: "Angels are ministering spirits sent to serve those who will inherit salvation. They watch over God's people. (Hebrews 1:14; Psalm 91:11-12)" },
      { t: "Michael the Archangel", c: "Michael is the great prince who stands up for God's people—another name for Christ Himself. (Daniel 12:1; Jude 1:9; 1 Thessalonians 4:16)" },
      { t: "Fallen Angels", c: "Satan and the demons are fallen angels who rebelled against God. Their power is limited, and their end is certain. (Revelation 12:7-9; Matthew 25:41)" }
    ],
    reflections: ["How does knowing about angels affect your daily life?", "What comfort does angelic protection bring?"],
    keyVerses: ["Hebrews 1:14", "Psalm 91:11", "Daniel 12:1"]
  },
  // Study 48: Forgiveness
  "48": {
    title: "Forgiveness",
    intro: "Forgiveness is at the heart of the gospel. We receive forgiveness from God and are called to extend it to others.",
    sections: [
      { t: "God's Forgiveness", c: "As far as the east is from the west, God removes our transgressions from us. He forgives abundantly. (Psalm 103:12; Isaiah 1:18; 1 John 1:9)" },
      { t: "Forgiving Others", c: "Jesus taught us to forgive others as we have been forgiven. Unforgiveness imprisons us, not them. (Matthew 6:14-15; Matthew 18:21-35)" },
      { t: "Seventy Times Seven", c: "Peter asked how many times to forgive—seven? Jesus said seventy times seven, showing unlimited forgiveness. (Matthew 18:21-22)" }
    ],
    reflections: ["Is there someone you need to forgive today?", "How has God's forgiveness changed your life?"],
    keyVerses: ["Psalm 103:12", "Matthew 6:14-15", "Colossians 3:13"]
  },
  // Study 49: The Trinity
  "49": {
    title: "The Trinity",
    intro: "The Bible reveals one God in three persons: Father, Son, and Holy Spirit. This mystery is at the heart of Christian faith.",
    sections: [
      { t: "One God", c: "Hear, O Israel: The Lord our God, the Lord is one. There is one God, the Father, and one Lord, Jesus Christ. (Deuteronomy 6:4; 1 Corinthians 8:6)" },
      { t: "Three Persons", c: "At Jesus' baptism, the Father spoke from heaven, the Son was baptized, and the Spirit descended as a dove. (Matthew 3:16-17; Matthew 28:19)" },
      { t: "Unity in Diversity", c: "The Father, Son, and Spirit work together in creation, salvation, and the life of the believer. (Genesis 1:26; John 14:16-17; 2 Corinthians 13:14)" }
    ],
    reflections: ["How does the Trinity reveal God's relational nature?", "How does each person of the Godhead relate to you?"],
    keyVerses: ["Deuteronomy 6:4", "Matthew 28:19", "2 Corinthians 13:14"]
  },
  // Study 50: Christian Hope
  "50": {
    title: "Christian Hope",
    intro: "Hope is an anchor for our souls—certain and secure. Christian hope is not wishful thinking but confident expectation of God's promises.",
    sections: [
      { t: "Hope as an Anchor", c: "Hope in God's promises is an anchor for our souls, keeping us steady through life's storms. (Hebrews 6:18-20; Romans 15:13)" },
      { t: "The Resurrection Hope", c: "Our hope centers on the resurrection—knowing that death is not the end and that Christ has conquered the grave. (1 Corinthians 15:19-22; 1 Peter 1:3-4)" },
      { t: "Hope for Today", c: "This hope purifies us and motivates us to live holy lives while we wait for Christ's return. (1 John 3:2-3; Titus 2:13-14)" }
    ],
    reflections: ["How does Christian hope differ from worldly optimism?", "How can hope sustain you through difficult times?"],
    keyVerses: ["Hebrews 6:19", "Romans 15:13", "1 Peter 1:3-4"]
  },
  // Study 51: Living by Faith
  "51": {
    title: "Living by Faith",
    intro: "The righteous shall live by faith. Faith is not a one-time decision but a daily walk of trusting God in every circumstance.",
    sections: [
      { t: "Faith Defined", c: "Faith is confidence in what we hope for and assurance about what we do not see. It's trusting God even when we don't understand. (Hebrews 11:1; 2 Corinthians 5:7)" },
      { t: "Examples of Faith", c: "Hebrews 11 lists heroes of faith—people who trusted God through impossible circumstances and saw His faithfulness. (Hebrews 11:1-40)" },
      { t: "Faith for Today", c: "Faith grows as we hear God's Word, pray, and step out in obedience. God is faithful to complete the work He began in us. (Romans 10:17; Philippians 1:6)" }
    ],
    reflections: ["Where is God calling you to trust Him more?", "How can you grow in your faith this week?"],
    keyVerses: ["Hebrews 11:1", "Romans 1:17", "2 Corinthians 5:7"]
  }
};

export default handbookData;
