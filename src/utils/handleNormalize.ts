export const NormalizeChat = (data: any) => {
  const result = data.reduce(
    (acc: any, chat: any) => {
      acc.chats.push({
        _id: chat._id,
        type: chat.type,
        members: chat.members.map((m: any) => m._id),
        groupName: chat.groupName,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
      });

      chat.members.forEach((member: any) => {
        if (!acc.memberMap[member._id]) {
          acc.memberMap[member._id] = member;
          acc.members.push(member);
        }
      });

      return acc;
    },
    {
      chats: [],
      members: [],
      memberMap: {},
    },
  );

  delete result.memberMap;

  return result;
};
