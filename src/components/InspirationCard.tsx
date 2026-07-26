import { Heart, Play, WandSparkles } from 'lucide-react'
import { useWorkbenchStore } from '@/store/workbenchStore'
import type { InspirationItem, ViewMode } from '@/types'

function imageUrl(prompt: string) {
  return `https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=portrait_4_3`
}

export function InspirationCard({ item, viewMode }: { item: InspirationItem; viewMode: ViewMode }) {
  const toggleLike = useWorkbenchStore((state) => state.toggleLike)
  const setToast = useWorkbenchStore((state) => state.setToast)
  const openDetail = useWorkbenchStore((state) => state.openDetail)
  const isList = viewMode === 'list'

  return (
    <article
      className={`group overflow-hidden rounded-[20px] border border-white/10 bg-[#21192f]/82 shadow-[0_14px_36px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#7a5dff]/55 hover:shadow-[0_20px_58px_rgba(72,48,160,0.26)] ${
        isList ? 'grid grid-cols-[200px_1fr] gap-0' : ''
      }`}
      role="button"
      tabIndex={0}
      onClick={() => openDetail(item.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') openDetail(item.id)
      }}
    >
      <div className={`relative overflow-hidden ${isList ? 'h-full min-h-[190px]' : 'aspect-[0.98]'}`}>
        <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={imageUrl(item.imagePrompt)} alt={item.audience} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#140f20]/85 via-transparent to-black/20" />
        <span className="absolute left-3 top-3 rounded-lg bg-black/55 px-2.5 py-1 text-[13px] font-bold text-white backdrop-blur">
          {item.audience}
        </span>
        <button
          className="absolute right-3 top-3 grid h-8 w-8 translate-y-1 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#7657ff]"
          aria-label="收藏素材"
          onClick={(event) => {
            event.stopPropagation()
            toggleLike(item.id)
          }}
        >
          <Heart size={15} className={item.liked ? 'fill-[#ff6aa9] text-[#ff6aa9]' : ''} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          <Play size={12} className="fill-white" />
          {item.videoType}
        </div>
      </div>

      <div className="flex min-h-[138px] flex-col p-3">
        <h2 className="line-clamp-3 text-[12px] font-semibold leading-[18px] text-[#f5f1ff]">{item.title}</h2>
        <div className="relative mt-auto pt-2.5">
          <div className="grid grid-cols-2 gap-2 transition duration-200 group-hover:opacity-0">
            <Metric label="热度" value={item.heat.toString()} />
            <Metric label="点击率" value={`${item.ctr.toFixed(2)}%`} />
          </div>
          <button
            className="absolute inset-x-0 top-2.5 flex h-10 translate-y-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7657ff] to-[#9a67ff] px-2 text-[12px] font-bold text-white opacity-0 shadow-[0_10px_22px_rgba(118,87,255,0.25)] transition hover:brightness-110 group-hover:translate-y-0 group-hover:opacity-100"
            onClick={(event) => {
              event.stopPropagation()
              setToast(`已基于「${item.audience}」素材生成脚本草稿`)
            }}
          >
            <WandSparkles size={14} />
            一键生成脚本
          </button>
        </div>
      </div>
    </article>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#15101f]/80 px-2 py-1">
      <div className="text-[13px] font-black leading-5 text-white">{value}</div>
      <div className="text-[10px] text-[#8e86a4]">{label}</div>
    </div>
  )
}
