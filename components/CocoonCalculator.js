import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

export default function CocoonCalculator() {
  const [numRand, setNumRand] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [silkwormWeight, setSilkwormWeight] = useState(0);
  const [cocoonShellWeight, setCocoonShellWeight] = useState(0);
  const [goodCocoonWeight, setGoodCocoonWeight] = useState(0);
  const [badCocoonWeight, setBadCocoonWeight] = useState(0);
  const [afterSortWeight, setAfterSortWeight] = useState(0);
  const [undevelopedWeight, setUndevelopedWeight] = useState(0);
  const [thinWeight, setThinWeight] = useState(0);
  const [boxCount, setBoxCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [showShareOptions, setShowShareOptions] = useState(false);
  const resultRef = useRef(null);

  const [shellPercentage, setShellPercentage] = useState(0);
  const [avgWeight, setAvgWeight] = useState(0);
  const [pricePerKg, setPricePerKg] = useState(0);
  const [goodIncome, setGoodIncome] = useState(0);
  const [badIncome, setBadIncome] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const formatNumber = (num) => {
    return num.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  const captureAndShareToFacebook = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current).then(canvas => {
        const imageData = canvas.toDataURL("image/png");
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`ผลการคำนวณรังไหมของ ${userName || 'ผู้ใช้งาน'} - อัครพงษ์ฟาร์ม`)}`;
        window.open(facebookShareUrl, "_blank");
      });
    }
  };
  
  const captureAndShareToLine = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current).then(canvas => {
        const imageData = canvas.toDataURL("image/png");
        const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`ผลการคำนวณรังไหมของ ${userName || 'ผู้ใช้งาน'} - อัครพงษ์ฟาร์ม`)}`;
        window.open(lineShareUrl, "_blank");
      });
    }
  };
  
  const captureAndSaveImage = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current).then(canvas => {
        const imageData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageData;
        link.download = `ผลการคำนวณไหม-${userName || 'ผู้ใช้งาน'}.png`;
        link.click();
      });
    }
  };

  useEffect(() => {
    let shellWeight = cocoonShellWeight;
    if (!shellWeight && totalWeight && silkwormWeight) {
      shellWeight = totalWeight - silkwormWeight;
    }

    let percent = 0;
    if (totalWeight > 0) {
      percent = (shellWeight / totalWeight) * 100;
    }

    let avg = 0;
    if (numRand > 0) {
      avg = totalWeight / numRand;
    }

    setShellPercentage(percent);
    setAvgWeight(avg);

    // ราคาตาม % เปลือกรัง
    let p = 0;
    const rounded = Math.round(percent);
    if (rounded <= 16) p = 200;
    else if (rounded === 17) p = 212.5;
    else if (rounded === 18) p = 225;
    else if (rounded === 19) p = 237.5;
    else if (rounded === 20) p = 250;
    else if (rounded === 21) p = 262.5;
    else if (rounded === 22) p = 275;
    else if (rounded === 23) p = 287.5;
    else if (rounded === 24) p = 300;
    else if (rounded === 25) p = 312.5;
    else if (rounded >= 26) p = 325;

    setPricePerKg(p);

    // รังดี
    const goodInc = goodCocoonWeight * p;
    setGoodIncome(goodInc);

    // รังเสีย
    const badInc = (badCocoonWeight * 140) + (afterSortWeight * 140) + (undevelopedWeight * 140) + (thinWeight * 25);
    setBadIncome(badInc);

    setTotalIncome(goodInc + badInc);
  }, [numRand, totalWeight, silkwormWeight, cocoonShellWeight, goodCocoonWeight, badCocoonWeight, afterSortWeight, undevelopedWeight, thinWeight]);

  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-green-50 flex flex-col items-center p-4 w-full max-w-md mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-green-700 text-center mb-4"
      >
        ระบบคำนวณ % ไหม และราคาซื้อ<br />อัครพงษ์ ฟาร์ม
      </motion.h1>

      <div className="w-full bg-white shadow-xl rounded-2xl mb-6">
        <div className="p-6 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">ชื่อผู้ใช้งาน</label>
            <input 
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
              placeholder="กรุณากรอกชื่อของคุณ"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">จำนวนรังที่สุ่ม (รัง)</label>
            <input 
              type="number" 
              value={numRand} 
              onChange={(e) => setNumRand(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md" 
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังรวม (กรัม)</label>
            <input 
              type="number" 
              value={totalWeight} 
              onChange={(e) => setTotalWeight(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักตัวไหม (กรัม)</label>
            <input 
              type="number" 
              value={silkwormWeight} 
              onChange={(e) => setSilkwormWeight(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักเปลือกรัง (กรัม)</label>
            <input 
              type="number" 
              value={cocoonShellWeight} 
              onChange={(e) => setCocoonShellWeight(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังดีที่จะขาย (กิโลกรัม)</label>
            <input 
              type="number" 
              value={goodCocoonWeight} 
              onChange={(e) => setGoodCocoonWeight(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังเสีย (กิโลกรัม)</label>
            <input 
              type="number" 
              value={badCocoonWeight} 
              onChange={(e) => setBadCocoonWeight(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังหลังจ่อ (กิโลกรัม)</label>
            <input 
              type="number" 
              value={afterSortWeight} 
              onChange={(e) => setAfterSortWeight(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังฝ่อ (กิโลกรัม)</label>
            <input 
              type="number" 
              value={undevelopedWeight} 
              onChange={(e) => setUndevelopedWeight(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังบาง (กิโลกรัม)</label>
            <input 
              type="number" 
              value={thinWeight} 
              onChange={(e) => setThinWeight(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">จำนวนกล่องที่เลี้ยง</label>
            <input 
              type="number" 
              value={boxCount} 
              onChange={(e) => setBoxCount(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <motion.div
            ref={resultRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 bg-green-50 border border-green-200 rounded-xl text-center"
          >
            <div className="mb-2 font-medium text-green-800">
              {userName ? `ผลการคำนวณของคุณ ${userName}` : 'ผลการคำนวณ'}
            </div>
            <p className="text-lg font-semibold text-green-700">% เปลือกรังไหม: {formatNumber(shellPercentage)}%</p>
            <p className="text-gray-600 mt-1">น้ำหนักรังเฉลี่ย: {formatNumber(avgWeight)} กรัม/รัง</p>
            <p className="text-gray-600 mt-1">ราคารับซื้อรังดี: {formatNumber(pricePerKg)} บาท/กก.</p>
            <p className="text-gray-600 mt-1">รายได้จากรังดี ≈ {formatNumber(goodIncome)} บาท</p>
            <p className="text-gray-600 mt-1">รายได้จากรังเสีย ≈ {formatNumber(badIncome)} บาท</p>
            <p className="text-gray-800 mt-2 font-bold">รายได้รวมทั้งหมด ≈ {formatNumber(totalIncome)} บาท</p>
          </motion.div>

          <div className="flex flex-col space-y-2 mt-4">
            <button 
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              {showShareOptions ? 'ซ่อนตัวเลือกการแชร์' : 'แชร์ผลการคำนวณ'}
            </button>
            
            {showShareOptions && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-2 flex flex-col space-y-2"
              >
                <button 
                  onClick={captureAndShareToFacebook}
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                  </svg>
                  แชร์ไปยัง Facebook
                </button>
                
                <button 
                  onClick={captureAndShareToLine}
                  className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.433.596-.065.021-.132.031-.2.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.433-.595.064-.022.131-.032.199-.032.211 0 .391.09.51.25l2.444 3.317V8.108c0-.345.282-.63.63-.63.345 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.066l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
                  </svg>
                  แชร์ไปยัง Line
                </button>
                
                <button 
                  onClick={captureAndSaveImage}
                  className="py-2 px-4 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  บันทึกเป็นรูปภาพ
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
