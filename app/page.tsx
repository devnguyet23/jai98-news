import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400">
            <Image
              src="/avatar.jpg"
              alt="Andy's Avatar"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Xin chào, tôi là Andy
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Software Developer | Tech Enthusiast | Blogger
        </p>
        
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Chào mừng đến với blog cá nhân của tôi. Nơi tôi chia sẻ về công nghệ, 
          lập trình, và những trải nghiệm trong hành trình phát triển phần mềm.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-4 pt-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:your.email@example.com"
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Khám phá Blog của tôi</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Đọc các bài viết mới nhất về công nghệ, lập trình và nhiều chủ đề thú vị khác
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Xem tất cả bài viết
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* About Section */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Về tôi</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Tôi là một Software Developer đam mê công nghệ và luôn tìm kiếm những 
            giải pháp sáng tạo cho các vấn đề phức tạp. Với kinh nghiệm trong việc 
            phát triển ứng dụng web và mobile, tôi luôn cập nhật những xu hướng 
            công nghệ mới nhất.
          </p>
          <p>
            Blog này là nơi tôi chia sẻ kiến thức, kinh nghiệm và những bài học 
            trong quá trình làm việc. Hy vọng những bài viết của tôi sẽ hữu ích 
            cho bạn!
          </p>
        </div>
      </section>
    </div>
  );
}
