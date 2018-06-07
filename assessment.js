(function() {
  'use strict';
  const userNameInput = document.getElementById('user-name');
  const assessmentButton = document.getElementById('assessment');
  const resultDivided = document.getElementById('result-area');
  const tweetDivided = document.getElementById('tweet-area');

  /**
  * 指定した要素の子供をすべて削除する
  * @param {HTMLElement} element HTMLの要素
  */
  function removeAllChildren (element) {
    while (element.firstChild) {// 子供の要素があるかぎり削除
      element.removeChild(element.firstChild);
    }
  }
  assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      return;
    }
    console.log(userName);
    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.setAttribute('data-lang', 'ja');
    anchor.setAttribute('data-show-count', 'false');
    anchor.innerText = '#あなたのいいところ　をツイートする';
    tweetDivided.appendChild(anchor);

    twttr.widgets.load();
  };

  userNameInput.onkeydown = (event) => {
    if (event.keyCode === 13) {
      // TODO ホタンのonclick() 処理を呼び出す
      assessmentButton.onclick();
    }
  };

  const ansers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。'
  ];

  /**
   * 名前の文字列を渡すと診断結果を返す関数
   * @param {string} userName ユーザーの名前
   * @return {string} 診断結果
   */
  function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfcharCode = 0;
    for (let i = 0; i < userName.length; i++) {
      sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfcharCode % ansers.length;
    let result = ansers[index];

    // {userName} をユーザーの名前に置き換える
    result = result.replace(/\{userName\}/g, userName);

    return result;
  }

  // テストコード
  console.assert(
    assessment('太郎') === '太郎のいいところは声です。太郎の特徴的な声は皆を惹きつけ、心に残ります。',
    '診断結果の文面の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );

})();
