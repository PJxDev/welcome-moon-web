import { ChangeEventHandler, FormEventHandler } from "react";

interface RoomFormProps { inputRoom: string; handleChange: ChangeEventHandler; handleSubmit: FormEventHandler; }

export default function RoomForm({ inputRoom, handleChange, handleSubmit }: RoomFormProps) {
  return (
    <form onSubmit= { handleSubmit } className = 'space-y-4' >
      <label className='flex flex-col items-start space-y-1' >
        <span className='text-sm font-medium' > Introducir ID de Room </span>
        <input type = 'text' value = { inputRoom } onChange = { handleChange } className = 'w-full px-4 py-2 rounded-full bg-white/20 text - white placeholder - white / 70 focus: outline - none focus: ring - 2 focus: ring - indigo - 400' placeholder = 'ej. 1234' />
      </label>
      <button type = 'submit' className = 'w - full py - 3 bg - gradient - to - r from - green - 400 to - teal - 500 rounded - full hover: from - green - 500 hover: to - teal - 600 transition - all duration - 300 shadow - md hover: shadow - lg' > Unirse </button>
    </form> 
  );
}