import os from 'os';

export const getLocalIpAddress = () => {
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const net of interfaces[name] || []) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
  } catch (e) {
    console.warn('Could not determine local IP:', e.message);
  }
  return 'localhost';
};

export const getFrontendBaseUrl = () => {
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL.replace(/\/$/, '');
  }
  const port = process.env.FRONTEND_PORT || '5173';
  const ip = getLocalIpAddress();
  return `http://${ip}:${port}`;
};

export const buildTableQrUrl = (qrSlug) => `${getFrontendBaseUrl()}/t/${qrSlug}`;
