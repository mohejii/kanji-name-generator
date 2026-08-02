// natural.js


// 自然な名前の組み合わせデータ

const GOOD_NAME_PATTERNS = [

    "真翔",
    "優斗",
    "美咲",
    "陽菜",
    "海斗",
    "莉奈",
    "悠真",
    "結衣",
    "彩花",
    "美月",
    "玲奈",
    "翔太"

];



// 避けたい組み合わせ

const BAD_NAME_PATTERNS = [

    "愛愛",
    "夢夢",
    "空空",
    "華華",
    "真真",
    "美美"

];



// 自然さを計算する関数

function calculateNaturalScore(name){


    let score = 50;



    // 良い組み合わせなら加点

    GOOD_NAME_PATTERNS.forEach(pattern=>{


        if(name.includes(pattern)){


            score += 30;


        }


    });



    // 不自然な組み合わせなら減点

    BAD_NAME_PATTERNS.forEach(pattern=>{


        if(name.includes(pattern)){


            score -= 30;


        }


    });




    // 同じ漢字が連続する場合

    for(let i=0; i<name.length-1; i++){


        if(
            name[i] === name[i+1]
        ){

            score -= 20;

        }


    }



    // 1文字の場合は少し減点

    if(name.length === 1){


        score -= 10;


    }




    // 長すぎる名前は減点

    if(name.length >= 6){


        score -= 10;


    }



    // 最低点・最高点を設定

    if(score > 100){

        score = 100;

    }


    if(score < 0){

        score = 0;

    }



    return score;


}