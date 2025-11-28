import { X } from "lucide-react";
import { PATCH_NOTES } from "@/src/data/patchNotes";

interface PatchNotesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PatchNotesModal({ isOpen, onClose }: PatchNotesModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">📢</span>
                        <h2 className="text-2xl font-bold text-white">
                            단풍이의 <span className="text-maple-orange">메이플 AI</span> 패치노트
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    {PATCH_NOTES.map((note, index) => (
                        <div key={index} className="relative pl-8 border-l-2 border-slate-800 last:border-transparent">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:border-maple-orange transition-colors"></div>

                            <div className="mb-2 flex flex-col sm:flex-row sm:items-center gap-2">
                                <span className="px-2 py-0.5 bg-maple-orange/20 text-maple-orange text-xs font-bold rounded border border-maple-orange/30 w-fit">
                                    v{note.version}
                                </span>
                                <span className="text-sm text-slate-500">{note.date}</span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">{note.title}</h3>

                            <ul className="space-y-2">
                                {note.changes.map((change, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed">
                                        <span className="text-maple-orange mt-1.5">•</span>
                                        <span>{change}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-800 bg-slate-950/50 rounded-b-2xl flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
