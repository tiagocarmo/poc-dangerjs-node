import { danger, message, warn, fail } from 'danger';
import run from './danger_modules/profiles/nextjs';

run(danger, { message, warn, fail });
