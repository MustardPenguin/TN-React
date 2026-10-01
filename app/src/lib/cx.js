/** Join class names, skipping falsy entries: cx('badge', isNew && 'new'). */
export const cx = (...names) => names.filter(Boolean).join(' ');
