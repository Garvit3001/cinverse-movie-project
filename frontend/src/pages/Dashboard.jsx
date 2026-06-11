import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { movies, reviews } from '../utils/data';

/**
 * Dashboard — Landing page after login.
 * Shows a welcome hero, platform stats, and quick action cards.
 */
function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon: '🎬', value: movies.length, label: 'Movies' },
    { icon: '⭐', value: reviews.length, label: 'Reviews' },
    { icon: '🎭', value: [...new Set(movies.map((m) => m.genre))].length, label: 'Genres' },
    { icon: '🏆', value: movies.filter((m) => m.rating >= 8.5).length, label: 'Top Rated' },
  ];

  const quickActions = [
    {
      icon: '🎥',
      title: 'Browse Movies',
      description: 'Explore our curated collection of films',
      path: '/movies',
    },
    {
      icon: '📝',
      title: 'Read Reviews',
      description: 'See what the community thinks',
      path: '/reviews',
    },
    {
      icon: '🔍',
      title: 'Discover New',
      description: 'Find hidden gems and trending titles',
      path: '/movies',
    },
  ];

  return (
    <div className="page" id="dashboard-page">
      <div className="container dashboard">
        {/* Hero Section */}
        <section className="dashboard__hero">
          <p className="dashboard__greeting">
            Welcome back, <strong>{user?.name || user?.username || 'cinephile'}</strong>
          </p>
          <h1 className="dashboard__title">
            Your Universe of{' '}
            <span className="dashboard__title-gradient">Cinema</span>
          </h1>
          <p className="dashboard__subtitle">
            Discover, rate, and review your favourite movies. Dive into a world
            curated for true film lovers. Your current access role is{' '}
            <strong>{user?.role || 'USER'}</strong>.
          </p>
        </section>

        {/* Stats */}
        <section className="dashboard__stats" id="dashboard-stats">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-card__icon">{stat.icon}</div>
              <div className="stat-card__value">{stat.value}</div>
              <div className="stat-card__label">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="dashboard__quick-actions">
          <h2 className="dashboard__section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <button
                className="quick-action"
                key={action.title}
                onClick={() => navigate(action.path)}
                id={`qa-${action.title.toLowerCase().replace(/\s/g, '-')}`}
              >
                <span className="quick-action__icon">{action.icon}</span>
                <div className="quick-action__text">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
