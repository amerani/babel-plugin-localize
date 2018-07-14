import { localizeKeyMap } from './jsxText';
import { locale } from './context';

export function localize(key) {
    return locale === 'en' && localizeKeyMap[key];
}