## 🚀 **Deploy on Render**

Per deployare questo progetto su Render, segui questi passi:

1. **Crea un account su Render**: vai su [render.com](https://render.com) e registrati.

2. **Collega il tuo repository GitHub**: dopo aver fatto login, collega il repository dove hai pushato il tuo bot WhatsApp.

3. **Crea un nuovo Web Service**:
   - **Repository**: seleziona il tuo repository del bot  
   - **Branch**: `main` (o quello che vuoi deployare)  
   - **Root Directory**: **lascia vuoto** (tutto il progetto è in root)  
   - **Build Command**:  
     ```bash
     npm install --legacy-peer-deps
     ```  
   - **Start Command**:  
     ```bash
     npm start
     ```

4. **Configura le environment variables** (consigliato):  
   - `ACCESS_TOKEN` → il token WhatsApp preso da Meta Developers  
   - `PHONE_NUMBER_ID` → il tuo Phone Number ID  
   - `VERIFY_TOKEN` → la stringa scelta per il webhook (es. `bnb123bot`)  

5. **Deploy**: clicca su **Create Web Service** e Render inizierà a buildare e deployare il progetto.

6. Una volta completato, Render ti darà un URL pubblico, tipo:  


7. **Configura il Webhook su Meta Developers**:  
   - URL di callback: `https://tuo-nuovo-progetto.onrender.com/webhook`  
   - VERIFY_TOKEN: lo stesso che hai messo nelle environment variables  

8. **Test**: scrivi al numero di test o al tuo WhatsApp Business per verificare che il bot risponda correttamente.
