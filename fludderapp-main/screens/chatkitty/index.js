import ChatKitty from 'chatkitty';

export const kitty = ChatKitty.getInstance('e5357347-d653-4ef6-b0a7-c5687baae4eb');

export function getChannelDisplayName(channel) {
  if (channel.type === 'DIRECT') {
    // return channel.members.map((member) => member.displayName).join(', ');
    return channel.members[1].displayName;
  } else {
    return channel.name;
  }
}