// score.js

// 漢字の意味評価データ

const KANJI_SCORE = {


    // 愛情・優しさ・人とのつながり

    "愛": {
        score:100,
        meaning:"愛情・大切な存在"
    },

    "優": {
        score:99,
        meaning:"優しさ・思いやり・才能"
    },

    "結": {
        score:97,
        meaning:"つながり・絆"
    },

    "心": {
        score:96,
        meaning:"心・温かさ"
    },


    // 光・未来・成長

    "輝": {
        score:99,
        meaning:"光・成功・輝き"
    },

    "翔": {
        score:98,
        meaning:"飛躍・未来へ羽ばたく"
    },

    "陽": {
        score:97,
        meaning:"太陽・明るさ"
    },

    "光": {
        score:96,
        meaning:"希望・明るい未来"
    },

    "希": {
        score:96,
        meaning:"希望・可能性"
    },


    // 美しさ・上品さ

    "美": {
        score:98,
        meaning:"美しさ・魅力"
    },

    "華": {
        score:97,
        meaning:"華やかさ・繁栄"
    },

    "花": {
        score:96,
        meaning:"美しさ・成長"
    },

    "玲": {
        score:95,
        meaning:"澄んだ美しさ・宝石"
    },

    "麗": {
        score:95,
        meaning:"美しい・気品"
    },


    // 誠実・強さ

    "真": {
        score:98,
        meaning:"誠実・真実"
    },

    "誠": {
        score:97,
        meaning:"正直・信頼"
    },

    "大": {
        score:90,
        meaning:"大きさ・力強さ"
    },

    "勇": {
        score:92,
        meaning:"勇気・強さ"
    },


    // 自然・自由

    "海": {
        score:94,
        meaning:"広さ・自由"
    },

    "空": {
        score:93,
        meaning:"自由・可能性"
    },

    "風": {
        score:90,
        meaning:"自由・変化"
    },

    "森": {
        score:88,
        meaning:"自然・成長"
    },


    // 宝石・希少性

    "瑠": {
        score:95,
        meaning:"宝石・輝き"
    },

    "珠": {
        score:94,
        meaning:"宝石・大切なもの"
    },


    // 伝統的で名前向き

    "和": {
        score:94,
        meaning:"平和・調和"
    },

    "悠": {
        score:93,
        meaning:"ゆったりした心・永遠"
    },

    "奏": {
        score:92,
        meaning:"音楽・調和"
    },

    "彩": {
        score:92,
        meaning:"色彩・個性"
    },

    "花": {
        score:96,
        meaning:"美しさ・成長"
    },


    // 補助的な漢字

    "衣": {
        score:80,
        meaning:"包む・優雅"
    },

    "依": {
        score:82,
        meaning:"信頼・支え"
    },

    "留": {
        score:75,
        meaning:"大切に保つ"
    },

    "斗": {
        score:85,
        meaning:"力強さ"
    }

};



// 漢字の点数を取得する関数

function getKanjiScore(kanji){

    if(KANJI_SCORE[kanji]){

        return KANJI_SCORE[kanji].score;

    }

    // 登録されていない漢字は平均点

    return 60;

}



// 漢字の意味を取得する関数

function getKanjiMeaning(kanji){

    if(KANJI_SCORE[kanji]){

        return KANJI_SCORE[kanji].meaning;

    }

    return "一般的な意味";

}