// roman.js

// ローマ字解析用データ

const ROMAN_PATTERNS = [

    // 長い音を先に判定する
    "sha",
    "shi",
    "shu",
    "sho",

    "cha",
    "chi",
    "chu",
    "cho",

    "kya",
    "kyu",
    "kyo",

    "rya",
    "ryu",
    "ryo",

    "nya",
    "nyu",
    "nyo",

    "hya",
    "hyu",
    "hyo",

    "mya",
    "myu",
    "myo",


    // 基本音

    "ka",
    "ki",
    "ku",
    "ke",
    "ko",

    "sa",
    "si",
    "su",
    "se",
    "so",

    "ta",
    "ti",
    "tu",
    "te",
    "to",

    "na",
    "ni",
    "nu",
    "ne",
    "no",

    "ha",
    "hi",
    "hu",
    "he",
    "ho",

    "ma",
    "mi",
    "mu",
    "me",
    "mo",

    "ya",
    "yu",
    "yo",

    "ra",
    "ri",
    "ru",
    "re",
    "ro",

    "wa",
    "wo",


    // 母音

    "a",
    "i",
    "u",
    "e",
    "o"

];



// ローマ字を小文字化

function normalizeRoman(name){

    return name
        .toLowerCase()
        .replace(/[^a-z]/g,"");

}



// 音節に分解する関数

function splitRoman(name){


    let text = normalizeRoman(name);


    let result = [];


    while(text.length > 0){


        let found = false;


        // 長い音からチェック

        for(let pattern of ROMAN_PATTERNS){


            if(text.startsWith(pattern)){


                result.push(pattern);


                text = text.slice(pattern.length);


                found = true;


                break;


            }


        }



        // 対応できない文字の場合

        if(!found){


            result.push(text.charAt(0));


            text = text.slice(1);


        }


    }


    return result;


}




// テスト用関数

function testRoman(name){


    console.log(
        splitRoman(name)
    );


}


// ===== Part11 発音補正機能 =====



// 外国人名でよく使われる音の補正

const PRONUNCIATION_FIX = {


    // 英語系

    "michael":[
        "mai",
        "ke",
        "ru"
    ],


    "michelle":[
        "mi",
        "she",
        "ru"
    ],


    "sophia":[
        "so",
        "fi",
        "a"
    ],


    "sarah":[
        "sa",
        "ra"
    ],


    "william":[
        "wi",
        "ri",
        "a"
    ],


    "alexander":[
        "a",
        "re",
        "ku",
        "san",
        "da"
    ],



    // ヨーロッパ系


    "marie":[
        "ma",
        "ri",
        "e"
    ],


    "anna":[
        "a",
        "na"
    ],


    "emma":[
        "e",
        "ma"
    ],


    "lisa":[
        "ri",
        "sa"
    ],


    "rose":[
        "ro",
        "ze"
    ],
    
// ===== Part15-A-1 発音辞書強化 =====



     "alex":[
          "a",
          "re",
          "ku"
     ],



     "alexander":[
           "a",
           "re",
           "ku",
           "san",
           "da"
      ],



      "daniel":[
           "da",
           "ni",
           "e",
           "ru"
       ],



       "david":[
           "de",
           "bi",
           "do"
       ],



       "christopher":[
           "ku",
           "ri",
           "su",
           "to",
           "fa"
       ],



"christina":[
    "ku",
    "ri",
    "su",
    "ti",
    "na"
],



"victor":[
    "bi",
    "ku",
    "to",
    "ru"
],



"victoria":[
    "bi",
    "ku",
    "to",
    "ri",
    "a"
],



"emma":[
    "e",
    "ma"
],



"olivia":[
    "o",
    "ri",
    "bi",
    "a"
],



"charlotte":[
    "sha",
    "ro",
    "to"
],



"william":[
    "wi",
    "ri",
    "a"
],



"james":[
    "je",
    "mu"
],



"john":[
    "jo",
    "n"
],



"henry":[
    "he",
    "n",
    "ri"
],



"hannah":[
    "ha",
    "na"
],



"lucas":[
    "lu",
    "ka",
    "su"
],



"leo":[
    "re",
    "o"
],



"noah":[
    "no",
    "a"
],



"nina":[
    "ni",
    "na"
]


};




// 発音補正して音分解する関数

function advancedSplitRoman(name){


    let normalized =
        normalizeRoman(name);



    // 登録済み名前なら専用変換

    if(
        PRONUNCIATION_FIX[normalized]
    ){

        return PRONUNCIATION_FIX[normalized];

    }



    // 登録がない場合は通常処理

    return splitRoman(normalized);


}
