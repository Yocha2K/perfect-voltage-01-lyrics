const tracks = {
  '01': ['We Rise', 'Yocha2K feat. 宮舞モカ'],
  '02': ['My Turn!'],
  '03': ['インキャ★パラダイス'],
  '04': ['アラームだけセットして'],
  '05': ['Morning Canvas'],
  '06': ['白い残像'],
  '07': ['怠惰プリンセス'],
  '08': ['COME ON'],
  '09': ['このまま、私']
};

const panel = document.querySelector('.lyrics-panel');
const number = document.querySelector('#lyrics-number');
const title = document.querySelector('#lyrics-title');
const content = document.querySelector('#lyrics-content');
const close = document.querySelector('#close-lyrics');

async function openLyrics(id) {
  const [name, artist = ''] = tracks[id];
  number.textContent = `${id} / LYRICS`;
  title.textContent = name;
  content.textContent = '読み込み中…';
  panel.classList.add('is-open');
  close.hidden = false;
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  try {
    const response = await fetch(`lyrics/${id}.txt`);
    if (!response.ok) throw new Error('lyrics not found');
    content.textContent = await response.text();
  } catch {
    content.textContent = '歌詞を読み込めませんでした。時間を置いて再度お試しください。';
  }
  if (artist) number.textContent += ` / ${artist}`;
}

document.querySelectorAll('.track').forEach((button) => {
  button.addEventListener('click', () => openLyrics(button.dataset.track));
});

close.addEventListener('click', () => {
  panel.classList.remove('is-open');
  close.hidden = true;
});
