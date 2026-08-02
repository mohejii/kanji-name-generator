// script.js


// ボタンを押した時の処理

document
.getElementById("generateButton")
.onclick = function(){



    // 入力された名前

    const name =
        document
        .getElementById("nameInput")
        .value;



    // 性別

    const gender =
        document
        .getElementById("gender")
        .value;



    // 表示する数

    const count =
        Number(
            document
            .getElementById("count")
            .value
        );



    // 未入力チェック

    if(name === ""){


        document
        .getElementById("result")
        .innerHTML =

        "<p>名前を入力してください。</p>";


        return;


    }




    // 候補生成

let results =
    generateKanjiNames(
        name,
        gender,
        count
    );



// ===== Part12 組み合わせ生成 =====


results =
combineKanjiCandidates(
    results
);


// ===== Part13 フィルター適用 =====


results =
filterCandidates(
    results
);


// スコア順に並び替え

results.sort(
    (a,b)=>
    b.score-a.score
);



// 上位候補だけ残す

results =
results.slice(
    0,
    count * 5
);




    // 自然さを追加

    results =
        results.map(item=>{


            return {

                ...item,

                natural:
                calculateNaturalScore(
                    item.kanji
                )

            };


        });





    // 総合点を計算

    results =
    results.map(item=>{


        return {


            ...item,


            total:

            Math.round(

                item.score * 0.7

                +

                item.natural * 0.3

            )


        };


    });





    // 総合点順に並べ替え

    results.sort(
        (a,b)=>
        b.total-a.total
    );




    // HTML作成


    let html = "";



    results.forEach(
        (item,index)=>{


            html += `


            <div class="candidate">


                <div class="rank">

                ${index+1}位

                </div>


                <h2>

                ${item.kanji}

                </h2>

                <p>
                総合点：
                ${item.total}点
                </p>
                <div class="score-star">

                ${"⭐".repeat(
                Math.round(item.total / 20)
                )}

                </div>

                <p>
                漢字評価：
                ${item.score}点
                </p>


                <p>
                読み候補：
                ${item.kanji}
                </p>


                <p>
                自然さ：
                ${item.natural}点
                </p>


                <p>
                意味：
                ${item.meaning}
                </p>
                <div class="meaning">

                ${item.meaning}

                </div>

            </div>


            <hr>


            `;


        }

    );




    document
    .getElementById("result")
    .innerHTML = html;



};