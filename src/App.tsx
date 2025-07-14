import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState('')
  const [downloadStatus, setDownloadStatus] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setError('')
  }

  const handlePreview = async () => {
    if (!url.trim()) {
      setError('请输入图片URL')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // 验证URL是否为图片
      const img = new Image()
      img.onload = () => {
        setImgUrl(url)
        setIsLoading(false)
      }
      img.onerror = () => {
        setError('无法加载图片，请检查URL是否正确')
        setIsLoading(false)
      }
      img.src = url
    } catch {
      setError('URL格式错误')
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!imgUrl) return

    setIsDownloading(true)
    setError('')

    try {
      // 方案1: 尝试直接fetch下载（适用于允许跨域的图片）
      const response = await fetch(imgUrl, {
        mode: 'cors',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      // 从URL中提取文件名，如果没有则使用默认名称
      const fileName = imgUrl.split('/').pop()?.split('?')[0] || 'downloaded-image.jpg'
      link.download = fileName
      
      // 确保下载而不是打开
      link.style.display = 'none'
      link.target = '_self'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      // 显示成功消息
      setError('')
      setDownloadStatus('下载成功！')
      setTimeout(() => setDownloadStatus(''), 3000)
      
    } catch (fetchError) {
      console.log('CORS fetch failed, trying Canvas method:', fetchError)
      
      try {
        // 方案2: 模拟右键"图片另存为"功能
        const img = document.createElement('img')
        img.src = imgUrl
        img.style.display = 'none'
        img.crossOrigin = 'anonymous'
        
        img.onload = () => {
          // 创建canvas来绘制图片
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          if (ctx) {
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            
            // 绘制图片到canvas
            ctx.drawImage(img, 0, 0)
            
            // 将canvas转换为blob并下载
            canvas.toBlob((blob) => {
              if (blob) {
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                
                const fileName = imgUrl.split('/').pop()?.split('?')[0] || 'downloaded-image.jpg'
                link.download = fileName
                link.style.display = 'none'
                
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
                
                setError('')
                setDownloadStatus('通过Canvas下载成功！')
                setTimeout(() => setDownloadStatus(''), 3000)
              } else {
                throw new Error('Canvas to blob failed')
              }
            }, 'image/jpeg', 0.9)
          } else {
            throw new Error('Canvas context failed')
          }
        }
        
        img.onerror = () => {
          console.log('Canvas image load failed due to CORS')
          // 检查是否是 Amazon S3 图片
          const isAmazonS3 = imgUrl.includes('amazonaws.com') || imgUrl.includes('s3.')
          
          if (isAmazonS3) {
            setError('Amazon S3 图片有跨域限制，无法自动下载。请在新窗口中右键选择"图片另存为"。')
            try {
              window.open(imgUrl, '_blank')
              setDownloadStatus('已在浏览器中打开图片，请右键选择"图片另存为"')
              setTimeout(() => setDownloadStatus(''), 5000)
            } catch {
              setError('无法打开图片。请复制图片URL，在浏览器中手动打开并保存。')
            }
          } else {
            // 不抛出错误，而是直接尝试备用方案
            try {
              window.open(imgUrl, '_blank')
              setDownloadStatus('已在浏览器中打开图片，请右键选择"图片另存为"')
              setTimeout(() => setDownloadStatus(''), 5000)
            } catch {
              setError('无法下载此图片。请复制图片URL，在浏览器中手动打开并保存。')
            }
          }
        }
        
        document.body.appendChild(img)
        
        // 设置超时，如果图片加载时间过长
        setTimeout(() => {
          if (img.parentNode) {
            img.parentNode.removeChild(img)
            console.log('Image load timeout, trying fallback')
            
            const isAmazonS3 = imgUrl.includes('amazonaws.com') || imgUrl.includes('s3.')
            if (isAmazonS3) {
              setError('Amazon S3 图片加载超时，请在新窗口中手动保存。')
            }
            
            try {
              window.open(imgUrl, '_blank')
              setDownloadStatus('已在浏览器中打开图片，请右键选择"图片另存为"')
              setTimeout(() => setDownloadStatus(''), 5000)
            } catch {
              setError('无法下载此图片。请复制图片URL，在浏览器中手动打开并保存。')
            }
          }
        }, 10000) // 10秒超时
        
      } catch (canvasError) {
        console.log('Canvas method failed:', canvasError)
        
        // 方案3: 最后备用方案 - 打开新窗口
        try {
          window.open(imgUrl, '_blank')
          setDownloadStatus('已在浏览器中打开图片，请右键选择"图片另存为"')
          setTimeout(() => setDownloadStatus(''), 5000)
        } catch {
          setError('所有下载方法都失败了。请复制图片URL，在浏览器中手动打开并保存。')
        }
      }
    } finally {
      setIsDownloading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePreview()
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>图片预览与下载</h1>
        
        <div className="input-section">
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="请输入图片URL（支持 jpg、png、gif 等格式）"
            className="url-input"
          />
          <button 
            onClick={handlePreview} 
            disabled={isLoading}
            className="preview-btn"
          >
            {isLoading ? '加载中...' : '预览'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {downloadStatus && (
          <div className="success-message">
            {downloadStatus}
          </div>
        )}

        {imgUrl && (
          <div className="preview-section">
            <div className="image-container">
              <img 
                src={imgUrl} 
                alt="预览图片" 
                className="preview-image"
                onError={() => setError('图片加载失败')}
              />
            </div>
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="download-btn"
            >
              {isDownloading ? '下载中...' : '下载图片'}
            </button>
          </div>
        )}

        <div className="instructions">
          <h3>使用说明：</h3>
          <ul>
            <li>输入图片的完整URL地址</li>
            <li>点击"预览"按钮查看图片</li>
            <li>点击"下载图片"按钮保存到本地</li>
            <li>支持常见图片格式：JPG、PNG、GIF、WebP等</li>
            <li>系统会自动尝试多种下载方式：直接下载 → Canvas转换</li>
            <li>如果自动下载失败，系统会打开图片页面供手动保存</li>
            <li><strong>注意：</strong>Amazon S3 等有跨域限制的图片需要手动保存</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
