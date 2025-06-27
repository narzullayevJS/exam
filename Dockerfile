FROM node:20

# Ishchi katalog yaratish
WORKDIR /app

# package fayllarni nusxalash
COPY package*.json ./

# bog‘lamalarni o‘rnatish
RUN npm install

# qolgan fayllarni qo‘shish
COPY . .

# agar build kerak bo‘lsa
RUN npm run build

# portni ochish
EXPOSE 3333

# appni ishga tushirish
CMD ["npm", "run", "start"]
