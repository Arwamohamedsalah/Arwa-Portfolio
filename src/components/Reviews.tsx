import React, { useEffect, useRef } from 'react';
import { Quote, Briefcase, Users, Github } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Reviews = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const reviews = [
    {
      id: 1,
      name: "براء عواد",
      platform: "Khamsat",
      platformIcon: Briefcase,
      review: "شكرا لك على العمل الأكثر من رائع وعلى جودة الخدمة وتسليم قبل الوقت المتفق عليه وبإذن الله في تعامل لنا مره ثانيه",
      project: "مستشار تسويقي"
    },
    {
      id: 2,
      name: "محمد الحسن",
      platform: "Khamsat",
      platformIcon: Briefcase,
      review: "كانت تجربة العمل مع الأستاذة أروى ممتازة. تعاملها راقٍ، وفهمت المطلوب بدقة، وسلمت الصفحة بشكل احترافي ومتجاوبة مع جميع الأجهزة. عندها صبر كبير وتجاوب سريع، وما قصّرت بأي تعديل طلبته. أنصح بالتعامل معها بشدة، وإن شاء الله مش آخر مرة. شكراً أروى!",
      project: "مشتري جديد"
    },
    {
      id: 3,
      name: "kafaaalmetmiza",
      platform: "Khamsat",
      platformIcon: Briefcase,
      review: "والله العظيم ممتازه جداً واداءها احترافي ججداً انصح بالتعامل معها بقوه وما راح يكون اول تعامل",
      project: "مدخل بيانات"
    },
    {
      id: 4,
      name: "zaidabuhaq",
      platform: "Khamsat",
      platformIcon: Briefcase,
      review: "عمل ممتاز ورائع",
      project: "مشتري VIP"
    },
    {
      id: 5,
      name: "مصطفى م.",
      platform: "Mostaql",
      platformIcon: Users,
      review: "رائع جداً سرعة في التواصل والتعامل والتسليم",
      project: "دعم، مساعدة وإدخال بيانات"
    }
  ];

  return (
    <section id="reviews" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${
              isDark ? 'bg-white/5' : 'bg-indigo-300/10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 8 + 6}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'
          }`}>
            Client Reviews
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isDark 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500'
          }`}></div>
          <p className={`mt-6 text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            What my clients say about working with me across different platforms
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => {
            const PlatformIcon = review.platformIcon;
            return (
              <div
                key={review.id}
                className={`animate-on-scroll backdrop-blur-sm rounded-xl border p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group ${
                  isDark 
                    ? 'bg-slate-800/30 border-slate-700/50 hover:border-blue-400/50 hover:shadow-blue-500/10'
                    : 'bg-white/70 border-gray-200/50 hover:border-indigo-400/50 hover:shadow-indigo-500/10'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className={`w-8 h-8 ${
                    isDark ? 'text-blue-400' : 'text-indigo-500'
                  } opacity-50`} />
                </div>

                {/* Review Text */}
                <p className={`mb-6 leading-relaxed text-right ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  "{review.review}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{review.name}</h4>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>{review.project}</p>
                  </div>
                </div>

                {/* Platform Badge */}
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                  review.platform === 'Khamsat'
                    ? isDark
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-orange-100/70 text-orange-600'
                    : review.platform === 'Mostaql'
                    ? isDark
                      ? 'bg-teal-500/20 text-teal-400'
                      : 'bg-teal-100/70 text-teal-600'
                    : isDark
                      ? 'bg-gray-500/20 text-gray-400'
                      : 'bg-gray-100/70 text-gray-600'
                }`}>
                  <PlatformIcon className="w-3 h-3" />
                  <span>{review.platform}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-on-scroll">
          <p className={`mb-6 text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Ready to work together?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`group text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
              isDark 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
            }`}
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;