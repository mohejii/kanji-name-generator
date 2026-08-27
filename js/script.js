import { GoogleGenAI, Type } from '@google/genai';

// ⚠️ ご自身の API キー（" " で囲む）
const GEMINI_API_KEY = "AQ.Ab8RN6K-_HAm6hc9xGgv-dFoHrL-KS0tlPXUA4oZlOlbNbAQnw";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const nameInput = document.getElementById('nameInput');
const genderSelect = document.getElementById('gender');
const countSelect = document.getElementById('count');
const generateBtn = document.getElementById('generateBtn');
const loading = document.getElementById('loading');
const resultArea = document.getElementById('resultArea');
const errorMsg = document.getElementById('errorMsg');

if (generateBtn) {
  generateBtn.addEventListener('click', handleGenerate);
}

async function handleGenerate() {
  const name = nameInput ? nameInput.value.trim() : '';
  const gender = genderSelect ? genderSelect.value : 'neutral';
  const count = countSelect ? parseInt(countSelect.value, 10) : 3;

  if (!name) {
    alert('名前を入力してください');
    return;
  }

  let genderText = "指定なし";
  if (gender === 'male') genderText = "男性らしい印象";
  if (gender === 'female') genderText = "女性らしい印象";

  if (errorMsg) errorMsg.style.display = 'none';
  if (resultArea) resultArea.innerHTML = '';
  if (loading) loading.style.display = 'block';
  generateBtn.disabled = true;

  try {
    const prompt = `外国人の名前「${name}」に合う漢字の当て字を ${count} つ提案してください。性別/印象: ${genderText}`;

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
                  meaning: { type: Type.STRING }
                },
                required: ['kanji', 'reading', 'meaning']
              }
            }
          },
          required: ['candidates']
        }
      }
    });

    const data = JSON.parse(response.text);
    renderResults(data.candidates);

  } catch (error) {
    console.error('AI Error:', error);
    if (errorMsg) {
      errorMsg.textContent = '生成に失敗しました: ' + error.message;
      errorMsg.style.display = 'block';
    }
  } finally {
    if (loading) loading.style.display = 'none';
    generateBtn.disabled = false;
  }
}

function renderResults(candidates) {
  if (!resultArea) return;
  candidates.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.marginTop = '15px';
    card.style.padding = '15px';
    card.style.border = '1px solid #ccc';
    card.style.borderRadius = '8px';

    card.innerHTML = `
      <div style="font-size: 1.4rem; font-weight: bold; color: #c0392b;">
        ${item.kanji} <span style="font-size: 0.9rem; color: #555;">（${item.reading}）</span>
      </div>
      <div style="margin-top: 8px; color: #333;">
        ${item.meaning}
      </div>
    `;

    resultArea.appendChild(card);
  });
}
