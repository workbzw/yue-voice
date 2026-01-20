import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
  src?: string; // PNG 图片路径，如果提供则使用图片，否则使用 SVG
}

export default function Logo({ className = '', size = 40, src }: LogoProps) {
  // 如果提供了图片路径，使用 PNG 图片
  if (src) {
    return (
      <Image
        src={src}
        alt="Yue Voice Logo"
        width={size}
        height={size}
        className={className}
        priority
      />
    );
  }

  // 否则使用 SVG
  const centerX = size / 2;
  const centerY = size / 2;
  
  // 音频波形条的配置（5个条，从左到右：中等、高、最高、高、中等）
  const bars = [
    { x: centerX - 8, width: 3, height: 8 },      // 左侧 - 中等
    { x: centerX - 4, width: 3, height: 11 },    // 左中 - 高
    { x: centerX - 1.5, width: 3, height: 14 },  // 中心 - 最高
    { x: centerX + 1.5, width: 3, height: 11 },  // 右中 - 高
    { x: centerX + 5, width: 3, height: 8 },     // 右侧 - 中等
  ];

  // 圆点圆圈配置（单个圆圈，顶部有缺口）
  const circleRadius = size * 0.38; // 圆圈半径约为整个尺寸的38%
  const dotCount = 32; // 圆点总数
  const dotSize = 1.8; // 圆点大小
  const gapAngle = Math.PI / 12; // 顶部缺口角度（约15度）

  // 生成圆点圆圈（顶部有缺口）
  const generateCircleDots = () => {
    const dots = [];
    const totalAngle = 2 * Math.PI - gapAngle; // 总角度减去缺口
    const startAngle = -Math.PI / 2 + gapAngle / 2; // 从顶部开始，但跳过缺口
    
    for (let i = 0; i < dotCount; i++) {
      const angle = startAngle + (i * totalAngle) / dotCount;
      const x = centerX + circleRadius * Math.cos(angle);
      const y = centerY + circleRadius * Math.sin(angle);
      dots.push(
        <circle
          key={`dot-${i}`}
          cx={x}
          cy={y}
          r={dotSize}
          fill="#a3e635" // lime-400 (更亮的绿色)
        />
      );
    }
    return dots;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 黑色背景 */}
      <rect width={size} height={size} fill="#000000" rx={4} />
      
      {/* 圆点圆圈（顶部有缺口） */}
      <g>
        {generateCircleDots()}
      </g>
      
      {/* 音频波形条 */}
      {bars.map((bar, index) => (
        <rect
          key={`bar-${index}`}
          x={bar.x}
          y={centerY - bar.height / 2}
          width={bar.width}
          height={bar.height}
          rx={1.5}
          fill="#a3e635" // lime-400 (更亮的绿色)
        />
      ))}
    </svg>
  );
}
