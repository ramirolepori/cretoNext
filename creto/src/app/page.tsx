import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Label from "@/components/ui/label"

export default function Component() {
  return (
    <div className="flex min-h-screen bg-black">
      <div className="hidden md:flex md:w-3/5 bg-black items-center justify-center p-8">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f82866205f852c8b658deb2c1f1fd23f_cretogif-sKujZOpufX22CumIuDfZqq0mmvFsPB.gif"
            alt="Abstract network visualization"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-full md:w-2/5 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Sign Up</h2>
            <p className="mt-2 text-sm text-gray-400">
              Start your journey with us today
            </p>
          </div>
          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="usuario" className="text-sm font-medium text-gray-300">
                  Usuario
                </Label>
                <Input
                  id="usuario"
                  name="usuario"
                  type="text"
                  className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white placeholder-gray-500 focus:border-white focus:ring-white"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <Label htmlFor="contrasena" className="text-sm font-medium text-gray-300">
                  Contraseña
                </Label>
                <Input
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  className="mt-1 block w-full rounded-lg bg-zinc-900 border-zinc-700 text-white placeholder-gray-500 focus:border-white focus:ring-white"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="space-y-4">
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 rounded-lg">
                Sign Up
              </Button>
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  info@creto.com
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}