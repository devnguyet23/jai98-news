import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight, Brain, Sparkles, Users, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        {/* <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-xl">
            <Image
              src="/avatar.jpg"
              alt="Jai's Avatar"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div> */}
        
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          Jai news
        </h1>
        
        <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium">
          AI Research & Innovation Hub
        </p>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Khám phá thế giới trí tuệ nhân tạo qua nghiên cứu chuyên sâu, 
          phân tích xu hướng và ứng dụng thực tiễn từ đội ngũ AI Team Research.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-4 pt-6">
          <a
            href="https://github.com/jai-research"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/company/jai-research"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:contact@jai-research.com"
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all hover:scale-110"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 rounded-2xl p-10 text-center shadow-lg">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Khám phá Nghiên cứu AI
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
          Đọc các bài phân tích chuyên sâu về AI, Machine Learning, Deep Learning và các công nghệ tiên tiến nhất
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          Xem tất cả bài viết
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* AI Team Research Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            AI Team Research
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Đội ngũ nghiên cứu chuyên sâu về trí tuệ nhân tạo và ứng dụng thực tiễn
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {/* Feature 1 */}
          <div className="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-850 hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-12 h-12 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Nghiên cứu AI
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Phân tích chuyên sâu các mô hình AI tiên tiến: GPT, LLaMA, Claude, Gemini và các công nghệ mới nhất
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-850 hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-12 h-12 rounded-lg bg-purple-600 dark:bg-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Xu hướng AI
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Cập nhật liên tục các xu hướng AI mới: Generative AI, AI Agents, Multimodal AI, RAG và nhiều hơn nữa
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-6 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-850 hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-12 h-12 rounded-lg bg-pink-600 dark:bg-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Cộng đồng AI
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Kết nối với cộng đồng AI Việt Nam, chia sẻ kiến thức và kinh nghiệm thực tế trong lĩnh vực AI
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-800 dark:to-gray-850 hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-12 h-12 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Ứng dụng thực tế
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Hướng dẫn triển khai AI vào doanh nghiệp: Chatbot, Automation, Data Analysis, Computer Vision
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white shadow-2xl">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-3xl font-bold">Sứ mệnh của chúng tôi</h3>
            <p className="text-lg text-blue-50 leading-relaxed">
              AI Team Research cam kết mang đến những nghiên cứu chất lượng cao, 
              phân tích chuyên sâu và hướng dẫn thực tiễn về trí tuệ nhân tạo. 
              Chúng tôi tin rằng AI không chỉ là công nghệ của tương lai, 
              mà là hiện tại đang định hình lại cách chúng ta sống và làm việc.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                Machine Learning
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                Deep Learning
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                NLP
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                Computer Vision
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                Generative AI
              </span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                AI Ethics
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Về Jai Blog</h2>
        <div className="prose dark:prose-invert max-w-none">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                Chúng tôi là ai?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Jai Blog là nền tảng chia sẻ kiến thức về AI được vận hành bởi 
                AI Team Research - một nhóm các nhà nghiên cứu, kỹ sư và chuyên gia 
                AI đam mê công nghệ và đổi mới sáng tạo.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Chúng tôi tập trung vào việc nghiên cứu, phân tích và chia sẻ 
                những kiến thức thực tiễn về AI, giúp cộng đồng Việt Nam tiếp cận 
                và ứng dụng công nghệ AI một cách hiệu quả.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                Chúng tôi làm gì?
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span>Nghiên cứu và phân tích các mô hình AI tiên tiến</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span>Chia sẻ kiến thức và kinh nghiệm thực tế về AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span>Hướng dẫn triển khai AI trong doanh nghiệp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span>Xây dựng cộng đồng AI Việt Nam mạnh mẽ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
