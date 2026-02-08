const Session = require("../models/session")
const User = require("../models/user")
const Space = require("../models/space")
const statusCodes = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors/index")

// 🕒 تحويل التاريخ لشيء مفهوم
function formatDate(date) {
  if (!date) return null
  const d = new Date(date)
  return d.toLocaleString("en-GB", { hour12: false })
}

// ==================== GET ALL SESSIONS ====================
const getAllSessions = async (req, res) => {
  const sessions = await Session.find().populate("createdBy").populate("space")

  if (sessions.length === 0) {
    throw new NotFoundError("there are no sessions")
  }

  res.status(statusCodes.OK).json({
    sessions: sessions.map(s => ({
      _id: s._id,
      space: s.space.name,
      client: s.client,
      createdBy: s.createdBy.name,
      status: s.status,
      startAt: formatDate(s.startAt),
      endAt: formatDate(s.endAt),
      duration: s.duration || null,
      totalPrice: s.totalPrice || null
    }))
  })
}

// ==================== GET SINGLE SESSION ====================
const getSession = async (req, res) => {
  const { id } = req.params
  const session = await Session.findById(id).populate("createdBy").populate("space")

  if (!session) {
    throw new NotFoundError(`there is no session with id ${id}`)
  }

  res.status(statusCodes.OK).json({
    _id: session._id,
    space: session.space.name,
    client: session.client,
    createdBy: session.createdBy.name,
    status: session.status,
    startAt: formatDate(session.startAt),
    endAt: formatDate(session.endAt),
    duration: session.duration || null,
    totalPrice: session.totalPrice || null
  })
}

// ==================== START SESSION ====================
const startSession = async (req, res) => {
  const { space, client } = req.body
  const createdBy = req.user.userID

  // التحقق من المستخدم و المكان
  const user = await User.findById(createdBy)
  const room = await Space.findById(space)
  if (!user) throw new NotFoundError("user not found")
  if (!room) throw new NotFoundError("space not found")

  // التأكد إن مفيش سيشن مفتوح لنفس المكان
  const activeSession = await Session.findOne({ space, status: "open" })
  if (activeSession) throw new BadRequestError("space already has an active session")

  // إنشاء السيشن
  let session = await Session.create({
    createdBy,
    space,
    client,
    startAt: req.body.startAt || new Date(),
    status: req.body.status || "open"
  })

  // populate بعد الإنشاء
  session = await Session.findById(session._id).populate("createdBy").populate("space")

  res.status(statusCodes.CREATED).json({
    session: {
      sessionID: session._id,
      client: session.client,
      space: session.space.name,
      createdBy: session.createdBy.name,
      status: session.status,
      startAt: formatDate(session.startAt)
    }
  })
}

// ==================== END SESSION ====================
const endSession = async (req, res) => {
  const { id } = req.params
  let session = await Session.findById(id).populate("createdBy").populate("space")

  if (!session) throw new NotFoundError("session not found")
  if (session.status === "close") throw new BadRequestError("session already closed")

  session.endAt = new Date()
  session.duration = session.getDuration()      // دالة موجودة في الموديل
  session.totalPrice = session.getTotalPrice()  // دالة موجودة في الموديل
  session.status = "close"

  await session.save()

  res.status(statusCodes.OK).json({
    session: {
      space: session.space.name,
      client: session.client,
      createdBy: session.createdBy.name,
      status: session.status,
      startAt: formatDate(session.startAt),
      endAt: formatDate(session.endAt),
      duration: session.duration,
      totalPrice: session.totalPrice
    }
  })
}

module.exports = { startSession, endSession, getSession, getAllSessions }
