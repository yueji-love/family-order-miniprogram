const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async () => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const now = db.serverDate();

  const users = db.collection('users');
  const existing = await users.where({ openid }).limit(1).get();

  if (existing.data.length > 0) {
    const user = existing.data[0];
    await users.doc(user._id).update({
      data: {
        updatedAt: now
      }
    });

    return {
      user: {
        _id: user._id,
        openid: user.openid,
        nickname: user.nickname || ''
      }
    };
  }

  const created = await users.add({
    data: {
      openid,
      nickname: '',
      avatarUrl: '',
      createdAt: now,
      updatedAt: now
    }
  });

  return {
    user: {
      _id: created._id,
      openid,
      nickname: ''
    }
  };
};
