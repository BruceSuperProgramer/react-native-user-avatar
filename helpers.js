import initials from 'initials';

export function abbr(name) {
  let abbr = initials(name);
  if (name.startsWith('+')) {
    abbr = `+${ abbr }`;
  }
  if (!abbr) abbr = name;
  return abbr;
}

export function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

export async function fetchImage(src) {
  try {
    const fetchCall = await fetch(src);
    if (fetchCall.headers.map['content-type'].startsWith('image/')) {
      return true;
    } else {
      console.warn('Online fetched source is not a supported image');
      return false;
    }
  } catch (err) {
    console.warn('Error fetching source, falling back to initials', err);
    return false;
  }
}

export function generateBackgroundStyle(name, bgColor, bgColors) {
  let background;
  if (bgColor) {
    background = bgColor;
  } else {
    // Pick a deterministic color from the list
    const i = sumChars(name) % bgColors.length;
    background = bgColors[i];
  }
  return {backgroundColor: background};
}

export function getContainerStyle(size, src, borderRadius) {
  return {
    borderRadius: borderRadius ? borderRadius : (size * 0.5),
    borderWidth: src ? 0 : 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  };
};