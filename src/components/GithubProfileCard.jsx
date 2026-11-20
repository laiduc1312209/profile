import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen, Star, GitFork, Users, ExternalLink, Bookmark, Check, Copy } from 'lucide-react';

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const LANGUAGE_CONFIG = {
  JavaScript: { color: '#f1e05a', name: 'JavaScript' },
  Python: { color: '#3572A5', name: 'Python' },
  HTML: { color: '#e34c26', name: 'HTML' },
  CSS: { color: '#563d7c', name: 'CSS' },
  TypeScript: { color: '#3178c6', name: 'TypeScript' },
  Default: { color: '#a78bfa', name: 'Code' },
};

export default function GithubProfileCard({ username = "laiduc1312209" }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const cardRef = useRef(null);

  // 3D Parallax Tilt Physics
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXSpring = useSpring(useTransform(mouseY, [0, 1], [5, -5]), {
    stiffness: 260,
    damping: 26,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), {
    stiffness: 260,
    damping: 26,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const [userData, setUserData] = useState({
    name: "Lại Đức",
    login: "laiduc1312209",
    avatar_url: "https://avatars.githubusercontent.com/u/171570309?v=4",
    bio: "funky",
    public_repos: 27,
    followers: 1,
    following: 0,
    html_url: "https://github.com/laiduc1312209",
  });

  const [pinnedRepos, setPinnedRepos] = useState([
    {
      name: "profile",
      url: "https://github.com/laiduc1312209/profile",
      desc: "Minimalist, modern Bio Profile website with 3D effects & music",
      lang: "JavaScript",
      stars: 0,
      forks: 0,
    },
    {
      name: "openppt",
      url: "https://github.com/laiduc1312209/openppt",
      desc: "Document processing and presentation automation tool",
      lang: "Python",
      stars: 0,
      forks: 0,
    },
    {
      name: "tracuuks12",
      url: "https://github.com/laiduc1312209/tracuuks12",
      desc: "Online student information lookup system",
      lang: "HTML",
      stars: 0,
      forks: 0,
    },
    {
      name: "AzoSkibidi",
      url: "https://github.com/laiduc1312209/AzoSkibidi",
      desc: "Web application experimental and development project",
      lang: "JavaScript",
      stars: 0,
      forks: 0,
    },
  ]);

  useEffect(() => {
    let isMounted = true;
    async function fetchGithubData() {
      try {
        const uRes = await fetch(`https://api.github.com/users/${username}`);
        if (uRes.ok) {
          const u = await uRes.json();
          if (isMounted) {
            setUserData({
              name: u.name || "Lại Đức",
              login: u.login || username,
              avatar_url: u.avatar_url || "https://avatars.githubusercontent.com/u/171570309?v=4",
              bio: u.bio?.trim() || "funky",
              public_repos: u.public_repos || 27,
              followers: u.followers || 1,
              following: u.following || 0,
              html_url: u.html_url || `https://github.com/${username}`,
            });
          }
        }

        const rRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
        if (rRes.ok) {
          const rList = await rRes.json();
          if (Array.isArray(rList) && rList.length > 0 && isMounted) {
            setPinnedRepos(
              rList.map((r) => ({
                name: r.name,
                url: r.html_url,
                desc: r.description || "Open source repository on GitHub",
                lang: r.language || "JavaScript",
                stars: r.stargazers_count || 0,
                forks: r.forks_count || 0,
              }))
            );
          }
        }
      } catch (err) {
        // Fallback ready
      }
    }
    fetchGithubData();
    return () => {
      isMounted = false;
    };
  }, [username]);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(userData.html_url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="relative w-full max-w-[420px] sm:max-w-[460px] rounded-[28px] p-[2px] group"
    >
      {/* Viền ngoài phản quang sáng */}
      <div className="absolute -inset-[2px] rounded-[30px] bg-gradient-to-b from-white/30 via-zinc-500/20 to-[var(--text-accent)]/30 opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[2px] -z-10" />

      <motion.div
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full rounded-[28px] bg-[#0d1117] border border-[#30363d] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-[#c9d1d9]"
      >
        {/* GitHub Official Header Bar */}
        <div className="px-5 py-3.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GithubIcon className="w-5 h-5 text-white" />
            <span className="font-semibold text-xs text-white tracking-wide">
              GitHub Profile
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              title="Copy GitHub profile link"
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white border border-[#30363d] transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy link</span>
                </>
              )}
            </button>

            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white border border-[#30363d] transition-colors"
              title="Open on GitHub"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* GitHub Navigation Tabs (Overview, Repositories, Stars) */}
        <div className="px-5 flex items-center gap-4 bg-[#0d1117] border-b border-[#30363d] text-xs font-medium overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#f78166] text-white font-semibold'
                : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('repos')}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'repos'
                ? 'border-[#f78166] text-white font-semibold'
                : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Repositories</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#30363d] text-[#c9d1d9]">
              {userData.public_repos}
            </span>
          </button>
        </div>

        {/* Profile Details & Bio */}
        <div className="p-5 flex flex-col gap-4 text-left">
          {/* Avatar & User Names */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#30363d] overflow-hidden bg-[#161b22] flex-shrink-0">
                <img
                  src={userData.avatar_url}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Status bubble emoji: funky */}
              <div 
                title="Status: funky"
                className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#161b22] border border-[#30363d] shadow-sm text-xs flex items-center gap-1"
              >
                <span>💭</span>
                <span className="text-[10px] text-zinc-300 font-mono hidden sm:inline">funky</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 pt-0.5">
              <h2 className="text-xl font-bold text-white tracking-tight truncate">
                {userData.name}
              </h2>
              <span className="text-sm font-light text-[#8b949e] font-mono">
                {userData.login}
              </span>

              {userData.bio && (
                <p className="text-xs text-[#c9d1d9] mt-2 font-mono bg-[#161b22] px-2.5 py-1 rounded-md border border-[#30363d] w-fit">
                  {userData.bio}
                </p>
              )}
            </div>
          </div>

          {/* Follow / Edit Button in GitHub style */}
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 px-3 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs font-semibold text-[#c9d1d9] hover:text-white transition-all text-center cursor-pointer shadow-sm"
          >
            Follow on GitHub
          </a>

          {/* Followers & Following Stats */}
          <div className="flex items-center gap-3 text-xs text-[#8b949e] font-mono">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <strong className="text-white">{userData.followers}</strong> follower
            </div>
            <span>·</span>
            <div>
              <strong className="text-white">{userData.following}</strong> following
            </div>
          </div>

          {/* Pinned Repositories Section (Ghim) */}
          <div className="mt-2 pt-4 border-t border-[#30363d]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-[#8b949e]" />
                Pinned Repositories
              </span>
              <a
                href={`${userData.html_url}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#58a6ff] hover:underline"
              >
                View all ({userData.public_repos})
              </a>
            </div>

            {/* Pinned Repos 2-column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pinnedRepos.map((repo, idx) => {
                const lang = LANGUAGE_CONFIG[repo.lang] || LANGUAGE_CONFIG.Default;
                return (
                  <a
                    key={idx}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-md bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] transition-all flex flex-col justify-between gap-2 group/pin cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <BookOpen className="w-3.5 h-3.5 text-[#8b949e] flex-shrink-0" />
                          <span className="font-semibold text-xs text-[#58a6ff] group-hover/pin:underline truncate">
                            {repo.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-medium text-[#8b949e] px-1.5 py-0.2 rounded-full border border-[#30363d] flex-shrink-0">
                          Public
                        </span>
                      </div>

                      {repo.desc && (
                        <p className="text-[11px] text-[#8b949e] mt-1.5 line-clamp-2 leading-relaxed">
                          {repo.desc}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-[#8b949e] font-mono mt-1 pt-1 border-t border-[#30363d]/50">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span>{lang.name}</span>
                      </span>

                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1 hover:text-[#58a6ff]">
                          <Star className="w-3 h-3 text-[#8b949e]" />
                          <span>{repo.stars}</span>
                        </span>
                      )}

                      {repo.forks > 0 && (
                        <span className="flex items-center gap-1 hover:text-[#58a6ff]">
                          <GitFork className="w-3 h-3 text-[#8b949e]" />
                          <span>{repo.forks}</span>
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
