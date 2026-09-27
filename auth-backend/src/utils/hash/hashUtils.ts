import bcrypt from 'bcrypt';

const saltRounds = 10;

const hash = (textToHash: string) => {
    return bcrypt.hashSync(textToHash, saltRounds)
}

const verify = (text: string, hash?: string) => {
  if (!hash) return false;
  return bcrypt.compareSync(text, hash);
};

    
export default {hash,verify}


