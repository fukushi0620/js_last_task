"use strict";

function calculate() {
  const total = parseFloat(document.getElementById("total").value);
  const people = parseInt(document.getElementById("people").value);
  const ratioInput = document.getElementById("ratios").value.trim();

  if (isNaN(total) || isNaN(people) || people <= 0) {
    alert("正しい数値を入力してください");
    return;
  }

  let ratios = ratioInput
    ? ratioInput.split(",").map(Number)
    : Array(people).fill(1);
  if (ratios.length !== people || ratios.some(isNaN)) {
    alert("正しい割合を入力してください");
    return;
  }

  const totalRatio = ratios.reduce((sum, val) => sum + val, 0);
  let payments = ratios.map((r) => (total * r) / totalRatio);

  // 割り切れる場合は整数に
  payments = payments.map((p) => (Number.isInteger(p) ? p : p.toFixed(2)));

  // 端数調整（合計を元の金額に合わせる）
  let adjustedTotal = payments.reduce((sum, p) => sum + parseFloat(p), 0);
  let diff = total - adjustedTotal;
  if (diff !== 0) {
    payments[0] = (parseFloat(payments[0]) + diff).toFixed(2);
  }

  document.getElementById("result").innerHTML = payments
    .map((p, i) => `人${i + 1}: ${p}円`)
    .join("<br>");
}

function clearFields() {
  document.getElementById("total").value = "";
  document.getElementById("people").value = "";
  document.getElementById("ratios").value = "";
  document.getElementById("result").innerHTML = "";
}
