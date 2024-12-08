// /**
//  * Setting up image lazy loading and LQIP switching
//  */

// const ATTR_DATA_SRC = 'data-src';
// const ATTR_DATA_LQIP = 'data-lqip';

// const cover = {
//   SHIMMER: 'shimmer',
//   BLUR: 'blur'
// };

// function removeCover(clzss) {
//   $(this).parent().removeClass(clzss);
// }

// function handleImage() {
//   if (!this.complete) {
//     return;
//   }

//   removeCover.call(this);
//   // if (this.hasAttribute(ATTR_DATA_LQIP)) {
//   //   removeCover.call(this, cover.BLUR);
//   // } else {
//   //   removeCover.call(this, cover.SHIMMER);
//   // }
// }

// /**
//  * Switches the LQIP with the real image URL.
//  */
// function switchLQIP() {
//   const $img = $(this);
//   const src = $img.attr(ATTR_DATA_SRC);

//   $img.attr('src', encodeURI(src));
//   $img.removeAttr(ATTR_DATA_SRC);
// }

// export function loadImg() {
//   const $images = $('article img');

//   if ($images.length) {
//     $images.on('load', handleImage);
//   }

//   // Images loaded from the browser cache do not trigger the 'load' event
//   $('article img[loading="lazy"]').each(function () {
//     if (this.complete) {
//       removeCover.call(this, cover.SHIMMER);
//     }
//   });

//   // LQIPs set by the data URI or WebP will not trigger the 'load' event,
//   // so manually convert the URI to the URL of a high-resolution image.
//   const $lqips = $(`article img[${ATTR_DATA_LQIP}="true"]`);

//   if ($lqips.length) {
//     $lqips.each(switchLQIP);
//   }
// }

const ATTR_DATA_SRC = 'data-src';
const ATTR_DATA_LQIP = 'data-lqip';
const cover = {
  BLUR: 'blur' // shimmer 제거
};

/**
 * 로딩 커버 제거
 */
function removeCover() {
  $(this).parent().removeClass(cover.BLUR); // Blur 커버만 제거
}

/**
 * 이미지 로딩 완료 처리
 */
function handleImage() {
  if (!this.complete) return;

  $(this).addClass('loaded'); // 로드 완료 시 표시
  removeCover.call(this); // Blur 제거
}

/**
 * LQIP를 고해상도 이미지로 전환
 */
function switchLQIP() {
  const $img = $(this);
  const src = $img.attr(ATTR_DATA_SRC);

  const highResImage = new Image();
  highResImage.src = encodeURI(src);

  highResImage.onload = () => {
    $img.attr('src', highResImage.src);
    $img.removeAttr(ATTR_DATA_SRC);
    $img.addClass('loaded'); // 로드 완료 표시
  };
}

/**
 * 이미지 로드 처리
 */
export function loadImg() {
  const $images = $('article img');

  // 이미지 로드 이벤트 처리
  if ($images.length) {
    $images.on('load', handleImage);
  }

  // 캐시에서 로드된 lazy-loaded 이미지 처리
  $('article img[loading="lazy"]').each(function () {
    if (this.complete) {
      removeCover.call(this); // Blur 제거
    }
  });

  // LQIP 이미지 처리
  const $lqips = $(`article img[${ATTR_DATA_LQIP}="true"]`);

  if ($lqips.length) {
    $lqips.each(switchLQIP);
  }
}
