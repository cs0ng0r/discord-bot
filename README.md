## **Discord bot TypeScript-tel**

### **Projekt inicializálása**
Hozz létre egy új mappát és telepítsd a szükséges csomagokat:
```bash
mkdir discord-bot-ts
cd discord-bot-ts
npm init -y
npm install discord.js dotenv @types/node
npm install -D typescript ts-node-dev @types/ws
```

---

### **TypeScript konfigurálása**
Hozz létre egy `tsconfig.json` fájlt a következő tartalommal:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

### **Környezeti változók beállítása**
Hozz létre egy `.env` fájlt, amely tartalmazza a bot tokenjét:
```
DISCORD_TOKEN=bot-token-ide
```

### **További információ**
- A Discord.js dokumentáció: [https://discord.js.org](https://discord.js.org)
- TypeScript útmutató: [https://www.typescriptlang.org](https://www.typescriptlang.org)
