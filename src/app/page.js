"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function App() {
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

  const [shellPercentage, setShellPercentage] = useState(0);
  const [avgWeight, setAvgWeight] = useState(0);
  const [pricePerKg, setPricePerKg] = useState(0);
  const [goodIncome, setGoodIncome] = useState(0);
  const [badIncome, setBadIncome] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const formatNumber = (num) => {
    return num.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex flex-col items-center p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-green-700 text-center mb-4"
      >
        ระบบคำนวณ % ไหม และราคาซื้อ<br />อัครพงษ์ ฟาร์ม
      </motion.h1>

      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">จำนวนรังที่สุ่ม (รัง)</label>
            <Input type="number" value={numRand} onChange={(e) => setNumRand(parseFloat(e.target.value) || 0)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังรวม (กรัม)</label>
            <Input type="number" value={totalWeight} onChange={(e) => setTotalWeight(parseFloat(e.target.value) || 0)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักตัวไหม (กรัม)</label>
            <Input type="number" value={silkwormWeight} onChange={(e) => setSilkwormWeight(parseFloat(e.target.value) || 0)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักเปลือกรัง (กรัม)</label>
            <Input type="number" value={cocoonShellWeight} onChange={(e) => setCocoonShellWeight(parseFloat(e.target.value) || 0)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังดีที่จะขาย (กิโลกรัม)</label>
            <Input type="number" value={goodCocoonWeight} onChange={(e) => setGoodCocoonWeight(parseFloat(e.target.value) || 0)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังเสีย (กิโลกรัม)</label>
            <Input type="number" value={badCocoonWeight} onChange={(e) => setBadCocoonWeight(parseFloat(e.target.value) || 0)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังหลังจ่อ (กิโลกรัม)</label>
            <Input type="number" value={afterSortWeight} onChange={(e) => setAfterSortWeight(parseFloat(e.target.value) || 0)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังฝ่อ (กิโลกรัม)</label>
            <Input type="number" value={undevelopedWeight} onChange={(e) => setUndevelopedWeight(parseFloat(e.target.value) || 0)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">น้ำหนักรังบาง (กิโลกรัม)</label>
            <Input type="number" value={thinWeight} onChange={(e) => setThinWeight(parseFloat(e.target.value) || 0)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">จำนวนกล่องที่เลี้ยง</label>
            <Input type="number" value={boxCount} onChange={(e) => setBoxCount(parseFloat(e.target.value) || 0)} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 bg-green-50 border border-green-200 rounded-xl text-center"
          >
            <p className="text-lg font-semibold text-green-700">% เปลือกรังไหม: {formatNumber(shellPercentage)}%</p>
            <p className="text-gray-600 mt-1">น้ำหนักรังเฉลี่ย: {formatNumber(avgWeight)} กรัม/รัง</p>
            <p className="text-gray-600 mt-1">ราคารับซื้อรังดี: {formatNumber(pricePerKg)} บาท/กก.</p>
            <p className="text-gray-600 mt-1">รายได้จากรังดี ≈ {formatNumber(goodIncome)} บาท</p>
            <p className="text-gray-600 mt-1">รายได้จากรังเสีย ≈ {formatNumber(badIncome)} บาท</p>
            <p className="text-gray-800 mt-2 font-bold">รายได้รวมทั้งหมด ≈ {formatNumber(totalIncome)} บาท</p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
