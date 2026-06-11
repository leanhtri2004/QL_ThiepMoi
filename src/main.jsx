import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CalendarDays,
  Check,
  ChevronUp,
  Clock3,
  GraduationCap,
  MapPin,
  PartyPopper,
  Sparkles,
  X,
} from 'lucide-react';
import busyPhoto from './img/H1.jpg';
import confirmPhoto from './img/H2.jpg';
import mainPhoto from './img/H3.jpg';
import './styles.css';

const eventInfo = [
  {
    icon: CalendarDays,
    label: 'Ngày',
    title: 'Thứ Ba, 16/09',
    detail: 'Một buổi sáng dành cho niềm vui và lời tri ân.',
  },
  {
    icon: Clock3,
    label: 'Thời gian',
    title: '10:00 Sáng',
    detail: 'Mong bạn đến sớm để cùng chụp vài tấm hình kỷ niệm.',
  },
  {
    icon: MapPin,
    label: 'Địa điểm',
    title: 'Hội trường Toà G 120 Hoàng Minh Thảo',
    detail: 'Đại học Duy Tân, Đà Nẵng',
  },
];

const navItems = [
  { id: 'hero', label: 'Thiệp mời', icon: Sparkles },
  { id: 'event', label: 'Sự kiện', icon: CalendarDays },
  { id: 'rsvp', label: 'RSVP', icon: Check },
];

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [reply, setReply] = useState('');

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.16 },
    );

    document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.35, 0.6], rootMargin: '-18% 0px -52% 0px' },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) sectionObserver.observe(section);
    });

    return () => sectionObserver.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header className="topbar">
        <button className="brand" onClick={() => scrollToSection('hero')} aria-label="Về đầu thiệp">
          <GraduationCap aria-hidden="true" />
          <span>Anh Trí's Milestone</span>
        </button>
        <PartyPopper className="topbarIcon" aria-hidden="true" />
      </header>

      <main>
        <section className="heroSection" id="hero">
          <div className="heroMedia reveal">
            <span className="badge badgeTop">
              <GraduationCap aria-hidden="true" />
            </span>
            <img
              src={mainPhoto}
              alt="Chân dung tốt nghiệp của Anh Trí"
            />
            <span className="badge badgeBottom">
              <Sparkles aria-hidden="true" />
            </span>
          </div>

          <div className="heroCopy reveal">
            <p className="eyebrow">Trân trọng kính mời</p>
            <h1>Thiệp Mời Tham Dự Lễ Tốt Nghiệp</h1>
            <p className="subtitle">Khoảnh khắc tri ân và khởi đầu một hành trình mới</p>
          </div>
        </section>

       

        <section className="eventSection" id="event">
          <div className="sectionHeading reveal">
            <p className="eyebrow">Thông tin sự kiện</p>
            <h2>Hẹn gặp bạn trong ngày đáng nhớ</h2>
          </div>

          <div className="eventGrid">
            {eventInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="infoCard reveal" style={{ transitionDelay: `${index * 90}ms` }} key={item.label}>
                  <div className="infoIcon">
                    <Icon aria-hidden="true" />
                  </div>
                  <div>
                    <p className="cardLabel">{item.label}</p>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="profileSection reveal" aria-label="Thông tin tân kỹ sư">
          <div>
            <p className="eyebrow">Tân cử nhân</p>
            <h2>Anh Trí</h2>
            <div className="majorBlock">
              <p>Công nghệ phần mềm</p>
              <span>Khoa Công nghệ thông tin</span>
              <span>Trường Đại học Duy Tân</span>
            </div>
          </div>
          <GraduationCap className="profileMark" aria-hidden="true" />
        </section>

        <section className="rsvpSection reveal" id="rsvp">
          <Sparkles className="rsvpIcon" aria-hidden="true" />
          <h2>Bạn sẽ đến chứ?</h2>
          <p>Vui lòng xác nhận sự hiện diện để gia đình chuẩn bị đón tiếp thật chu đáo.</p>
          <div className="rsvpActions">
            <button className={reply === 'yes' ? 'selected' : ''} onClick={() => setReply('yes')}>
              <Check aria-hidden="true" />
              Sẽ có mặt
            </button>
            <button className={reply === 'no' ? 'selected muted' : 'muted'} onClick={() => setReply('no')}>
              <X aria-hidden="true" />
              Rất tiếc tôi bận
            </button>
          </div>
          {reply === 'yes' && (
            <div className="confirmReveal" aria-live="polite">
              <img src={confirmPhoto} alt="Meme xác nhận tham gia" />
            </div>
          )}
          {reply === 'no' && (
            <div className="busyReveal" aria-live="polite">
              <img src={busyPhoto} alt="Hữu Duyên" />
              <strong>KÊU THẰNG TRONG HÌNH HỮU DUYÊN CHỪ</strong>
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>Anh Trí's Journey</p>
        <span>Celebrating Anh Trí's Achievement</span>
        <button onClick={() => scrollToSection('hero')} aria-label="Lên đầu trang">
          <ChevronUp aria-hidden="true" />
        </button>
      </footer>

      <nav className="bottomNav" aria-label="Điều hướng thiệp mời">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              className={activeSection === item.id ? 'active' : ''}
              key={item.id}
              onClick={() => scrollToSection(item.id)}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
