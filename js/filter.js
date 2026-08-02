// filter.js


// ===== Part13 候補整理フィルター =====



// 避けたい意味ワード

const BAD_MEANING_WORDS = [


    "死",
    "墓",
    "苦",
    "病",
    "暗",
    "失",
    "孤",
    "別",
    "災",
    "呪"


];





// 禁止意味チェック

function checkMeaningSafety(item){


    let text =
        item.meaning;



    for(
        let word of BAD_MEANING_WORDS
    ){

        if(
            text.includes(word)
        ){

            return false;

        }

    }


    return true;


}







// 名前長さチェック

function checkNameLength(item){


    let length =
        item.kanji.length;



    // 1文字はOK

    if(length === 1){

        return true;

    }



    // 2〜4文字を推奨

    if(
        length >=2
        &&
        length <=4
    ){

        return true;

    }



    return false;


}








// 同じ漢字が続く名前を除外

function checkDuplicateKanji(item){


    let name =
        item.kanji;



    for(
        let i=0;
        i<name.length-1;
        i++
    ){


        if(
            name[i] === name[i+1]
        ){

            return false;

        }


    }


    return true;


}








// 総合フィルター

function filterCandidates(results){



    return results.filter(item=>{


        return (

            checkMeaningSafety(item)

            &&

            checkNameLength(item)

            &&

            checkDuplicateKanji(item)

        );


    });



}