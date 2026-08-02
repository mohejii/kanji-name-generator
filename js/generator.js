// generator.js


// 名前から漢字候補を作成する関数

function generateKanjiNames(
    name,
    gender = "neutral",
    count = 10
){


    // ローマ字を音に分解

    const sounds = advancedSplitRoman(name);



    let candidates = [];



    // 音ごとに漢字候補を取得

    sounds.forEach(sound => {



        if(KANJI_DICTIONARY[sound]){


            KANJI_DICTIONARY[sound].forEach(item => {



                // NG漢字チェック

                if(
                    isAllowedKanji(item.kanji)
                ){


                    // 性別補正

                    let bonus = 0;


                    if(
                        item.gender === gender
                        ||
                        item.gender === "neutral"
                    ){

                        bonus += 5;

                    }



                    candidates.push({

                        kanji:item.kanji,

                        meaning:item.meaning,

                        score:
                            item.score
                            +
                            bonus

                    });



                }


            });


        }



    });



    // 点数順に並び替え

    candidates.sort(
        (a,b)=>
        b.score-a.score
    );



    // 重複削除

    let unique=[];


    candidates.forEach(item=>{


        if(
            !unique.some(
                x=>x.kanji===item.kanji
            )
        ){

            unique.push(item);

        }


    });



    // 指定数だけ返す

    return unique.slice(0,count);


}





// 表示用データ作成

function createResultHTML(results){



    if(results.length===0){


        return
        "<p>候補が見つかりませんでした。</p>";


    }



    let html="";



    results.forEach(
        (item,index)=>{


            html += `

            <div class="candidate">

                <h2>
                ${index+1}位：
                ${item.kanji}
                </h2>

                <p>
                点数：
                ${item.score}
                点
                </p>

                <p>
                意味：
                ${item.meaning}
                </p>

            </div>

            `;


        }

    );



    return html;


}

// ===== Part12 名前組み合わせ生成機能 =====



// 候補を組み合わせる関数

function combineKanjiCandidates(results){


    let names = [];



    // 1文字候補

    results.forEach(a=>{


        names.push({

            kanji:a.kanji,

            meaning:a.meaning,

            score:a.score

        });


    });





    // 2文字組み合わせ

    for(
        let i = 0;
        i < results.length;
        i++
    ){

        for(
            let j = 0;
            j < results.length;
            j++
        ){


            if(i !== j){


                names.push({


                    kanji:
                    results[i].kanji
                    +
                    results[j].kanji,


                    meaning:

                    results[i].meaning
                    +
                    "・"
                    +
                    results[j].meaning,


                    score:

                    Math.round(

                        (
                        results[i].score
                        +
                        results[j].score
                        )
                        /
                        2

                    )


                });


            }


        }


    }





    // 3文字組み合わせ

    for(
        let i = 0;
        i < results.length;
        i++
    ){

        for(
            let j = 0;
            j < results.length;
            j++
        ){

            for(
                let k = 0;
                k < results.length;
                k++
            ){


                if(
                    i !== j
                    &&
                    j !== k
                    &&
                    i !== k
                ){


                    names.push({


                        kanji:

                        results[i].kanji
                        +
                        results[j].kanji
                        +
                        results[k].kanji,


                        meaning:

                        "複数の良い意味を組み合わせた名前",


                        score:

                        Math.round(

                            (
                            results[i].score
                            +
                            results[j].score
                            +
                            results[k].score
                            )
                            /
                            3

                        )


                    });


                }

            }

        }

    }





    return names;


}