import { GoogleGenAI, Type } from '@google/genai';

// ⚠️ あなたの Gemini API キーを記述してください
const GEMINI_API_KEY = "AIzaSy..."; 
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// DOM要素の取得
const nameInput = document.getElementById('nameInput');
const genderSelect = document.getElementById('gender');
const countSelect = document.getElementById('count');
const generateBtn = document.getElementById('generateBtn');
const loading = document.getElementById('loading');
const resultArea = document.getElementById('resultArea');
const errorMsg = document.getElementById('errorMsg');

generateBtn.addEventListener('click', handleGenerate);
nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleGenerate();
});

async function handleGenerate() {
  const name = nameInput.value.trim();
  const gender = genderSelect.value;
  const count = parseInt(countSelect.value, 10);

  if (!name) {
    alert('名前を入力してください');
    return;
  }

  // 性別の日本語変換
  let genderText = "指定なし（ニュートラル）";
  if (gender === 'male') genderText = "男性らしい響きや印象";
  if (gender === 'female') genderText = "女性らしい響きや印象";

  // UI表示の初期化
  errorMsg.style.display = 'none';
  resultArea.innerHTML = '';
  loading.style.display = 'block';
  generateBtn.disabled = true;

  try {
    const prompt = `
外国人の名前「${name}」に合う日本の漢字の当て字（読みとポジティブな意味付き）を ${count} つ提案してください。

条件:
1. 雰囲気/性別傾向: ${genderText}
2. 音の響き（読み）ができるだけ元の名前に近く、自然であること。
3. ポジティブで美しい意味や願いが込められた漢字を選ぶこと。
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            candidates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  kanji: { type: Type.STRING },
                  reading: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                },
                required: ['kanji', 'reading', 'meaning'],
              },
            },
          },
          required: ['candidates'],
        },
      },
    });

    const data = JSON.parse(response.text);
    renderResults(data.candidates);

  } catch (error) {
    console.error('AI Error:', error);
    errorMsg.textContent = '当て字の生成に失敗しました。';
    errorMsg.style.display = 'block';
  } finally {
    loading.style.display = 'none';
    generateBtn.disabled = false;
  }
}

function renderResults(candidates) {
  candidates.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.marginTop = '15px';

    card.innerHTML = `
      <div style="font-size: 1.5rem; font-weight: bold; color: #c0392b;">
        ${item.kanji} <span style="font-size: 1rem; color: #555;">（${item.reading}）</span>
      </div>
      <div style="margin-top: 8px; color: #333; line-height: 1.4;">
        ${item.meaning}
      </div>
    `;

    resultArea.appendChild(card);
  });
}
    .innerHTML = html;



};
